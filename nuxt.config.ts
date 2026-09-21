// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// Аутентификация построена на серверной сессии в cookie. При SSR запрос уходит
	// из Node, а не из браузера, и cookie нужно пробрасывать руками. Для формы
	// регистрации это лишнее, поэтому приложение работает как SPA.
	ssr: false,

	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	// ALLOWED_ORIGIN бэкенда — http://localhost:3000, порт менять нельзя.
	devServer: { port: 3000 },

	modules: ['vuetify-nuxt-module'],

	css: ['@mdi/font/css/materialdesignicons.css'],

	runtimeConfig: {
		public: {
			apiBase: '/api'
		}
	},

	nitro: {
		devProxy: {
			'/api': {
				target: 'http://localhost:4000',
				changeOrigin: true
			}
		}
	},

	vuetify: {
		vuetifyOptions: {
			theme: {
				defaultTheme: 'dark'
			},
			defaults: {
				VTextField: {
					variant: 'outlined',
					density: 'comfortable'
				}
			}
		}
	}
})
