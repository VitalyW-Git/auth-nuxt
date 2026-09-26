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

	css: ['~/assets/styles/layers.css', '@mdi/font/css/materialdesignicons.css'],

	app: {
		head: {
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap'
				}
			]
		}
	},

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
				defaultTheme: 'dark',
				// Светлая тема главной страницы, по макету «Home — Desktop 1440» в Figma.
				// Формы входа и кабинет остаются в тёмной теме по умолчанию.
				themes: {
					clinic: {
						dark: false,
						colors: {
							primary: '#0FA3A3',
							secondary: '#0B2A3C',
							background: '#F4F9FA',
							surface: '#FFFFFF',
							'on-background': '#0B2A3C',
							'on-surface': '#0B2A3C'
						}
					}
				}
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
