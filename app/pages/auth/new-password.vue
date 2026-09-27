<script setup lang="ts">
import { AxiosError } from 'axios'

// Сюда ведёт ссылка из письма: reset-password.template.tsx бэкенда собирает
// `${ALLOWED_ORIGIN}/auth/new-password?token=...`. Смена пароля сессию не
// создаёт, поэтому после успеха пользователь идёт на страницу входа.
const route = useRoute()
const { $api } = useNuxtApp()

const token = computed(() =>
	typeof route.query.token === 'string' ? route.query.token : ''
)

const password = ref('')
const isValid = ref(false)
const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isChanged = ref(false)
const isTokenInvalid = ref(!token.value)
const serverErrors = ref<string[]>(
	token.value ? [] : ['В ссылке нет токена сброса пароля.']
)

// Правила повторяют NewPasswordDto бэкенда, тексты взяты оттуда же.
const passwordRules = [
	(v: string) => !!v || 'Поле новый пароль не может быть пустым.',
	(v: string) => v.length >= 6 || 'Пароль должен содержать не менее 6 символов.'
]

// ResetPasswordHandler отвечает 404 на неизвестный токен и 400 со строкой на
// просроченный; ошибки валидации приходят как 400 с массивом.
const isTokenError = (error: unknown): boolean => {
	if (!(error instanceof AxiosError)) {
		return false
	}
	const status = error.response?.status
	const message = error.response?.data?.message
	return status === 404 || (status === 400 && typeof message === 'string')
}

const onSubmit = async (): Promise<void> => {
	serverErrors.value = []
	isLoading.value = true
	try {
		await $api.post(`/auth/password-recovery/new/${token.value}`, {
			password: password.value
		})
		isChanged.value = true
	} catch (error) {
		serverErrors.value = extractApiErrors(error)
		isTokenInvalid.value = isTokenError(error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<AuthShell panel-title="Почти готово">
		<div v-if="isChanged" class="auth__status">
			<span class="auth__status-icon">
				<v-icon icon="mdi-check" size="34" />
			</span>
			<h2 class="auth__title">Пароль изменён</h2>
			<p class="auth__subtitle">Теперь войдите в аккаунт с новым паролем.</p>
			<v-btn to="/auth/login" color="primary" size="x-large" block flat>Войти</v-btn>
		</div>

		<template v-else>
			<h2 class="auth__title">Новый пароль</h2>
			<p class="auth__subtitle">Придумайте новый пароль для входа в аккаунт.</p>

			<v-alert
				v-if="serverErrors.length"
				type="error"
				variant="tonal"
				class="mb-4"
			>
				<div v-for="message in serverErrors" :key="message">
					{{ message }}
				</div>
			</v-alert>

			<v-btn
				v-if="isTokenInvalid"
				to="/auth/reset-password"
				color="primary"
				size="x-large"
				block
				flat
			>
				Запросить новую ссылку
			</v-btn>

			<v-form v-else v-model="isValid" class="auth__form" @submit.prevent="onSubmit">
				<v-text-field
					v-model="password"
					label="Новый пароль"
					:type="isPasswordVisible ? 'text' : 'password'"
					:rules="passwordRules"
					autocomplete="new-password"
					prepend-inner-icon="mdi-lock-outline"
					:append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
					hint="Минимум 6 символов"
					persistent-hint
					@click:append-inner="isPasswordVisible = !isPasswordVisible"
				/>

				<v-btn
					type="submit"
					color="primary"
					size="x-large"
					block
					flat
					:loading="isLoading"
					:disabled="!isValid"
				>
					Сохранить пароль
				</v-btn>
			</v-form>

			<p class="auth__switch">
				Вспомнили пароль?
				<NuxtLink to="/auth/login">Войти</NuxtLink>
			</p>
		</template>
	</AuthShell>
</template>
