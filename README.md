# frontend

SPA на Nuxt 4 + Vuetify 4 для бэкенда аутентификации `../nestjs-server`.

## Запуск

Нужен Node 22 (версия зафиксирована в `.nvmrc`); системный Node 18 для Nuxt не подходит.

```bash
nvm use            # берёт версию из .nvmrc
npm install
npm run dev        # http://localhost:3000
```

Бэкенд должен быть запущен отдельно на порту 4000 (`npm run start:dev` в `../nestjs-server`),
а для писем подтверждения — MailHog:

```bash
docker run -d --name mailhog -p 1025:1025 -p 8025:8025 mailhog/mailhog   # UI на :8025
```

Страницы: `/` — ссылки на регистрацию и вход, `/register` — регистрация, `/auth/login` — вход
(с кодом 2FA, если он включён), `/auth/new-verification?token=…` — сюда ведёт ссылка из письма,
`/dashboard/settings` — только для авторизованных.

## Авторизация

Регистрация сессию **не** создаёт: бэкенд требует подтвердить email, а вход неподтверждённого
пользователя отклоняет. Сессию создают два эндпоинта — `POST /auth/email-confirmation` (страница
`/auth/new-verification`) и `POST /auth/login`, — после обоих клиент уводит на `/dashboard/settings`.

Cookie сессии httpOnly, из JS её не видно, поэтому состояние входа узнаётся запросом
`GET /users/profile`. Это делает route middleware `app/middleware/auth.ts`: при 401 отправляет на
`/auth/login`. Защищённую страницу помечают `definePageMeta({ middleware: 'auth' })`. Пользователь
хранится в `useState` внутри composable `app/composables/useAuth.ts`.

## Почему так устроено

**Порт 3000 не выбирается.** В `.env` бэкенда `ALLOWED_ORIGIN='http://localhost:3000'`, и CORS
пропускает только его. Порт задан в `nuxt.config.ts` явно.

**`ssr: false`.** Аутентификация построена на серверной сессии в cookie, а не на JWT. При SSR
запрос уходит из Node, cookie с собой не несёт, и её пришлось бы пробрасывать вручную через
`useRequestHeaders(['cookie'])`. Для формы регистрации это лишняя сложность. Включить SSR позже —
одна строка, но тогда серверные запросы нужно будет чинить осознанно.

**Прокси вместо прямых запросов к :4000.** `nitro.devProxy` проксирует `/api` на бэкенд и снимает
префикс, поэтому браузер считает запросы одноисточниковыми: CORS и междоменные cookie не участвуют.
Базовый URL лежит в `runtimeConfig.public.apiBase`, в проде подменяется на реальный адрес API.

**axios, а не `$fetch`.** Инстанс создаётся в `app/plugins/api.ts` с `withCredentials: true` —
без этого cookie `session` не отправляется и не принимается. Модуль `@nuxtjs/axios` не используется:
он остался в эпохе Nuxt 2 и заброшен.

**Тексты ошибок приходят с сервера.** `ValidationPipe` возвращает `message` массивом строк на
русском, остальные исключения Nest — строкой; `app/utils/api-errors.ts` приводит оба вида к
`string[]`. Правила в форме дублируют `RegisterDto` только чтобы не дёргать сервер зря.

## reCAPTCHA

Эндпоинт `/auth/register` помечен `@Recaptcha()`, но в конфиге стоит `skipIf: isDev(...)`, поэтому
при `NODE_ENV=development` капча не проверяется и на фронте не нужна. Для прода понадобится
`vue-recaptcha-v3` и site key, а токен бэкенд ждёт **в заголовке** `recaptcha` — так задано в
`src/config/recaptcha.config.ts`, а не в теле запроса.
