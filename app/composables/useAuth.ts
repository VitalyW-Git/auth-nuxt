import type {
	LoginPayloadInterface,
	LoginResponseType,
	MessageResponseInterface,
	OAuthProviderType,
	RegisterPayloadInterface,
	SessionResponseInterface,
	UserInterface
} from '~/types/auth'

// Сессия живёт в httpOnly cookie, прочитать её из JS нельзя. Единственный
// способ узнать, вошёл ли пользователь, — спросить защищённый /users/profile.
export const useAuth = () => {
	const { $api } = useNuxtApp()
	const user = useState<UserInterface | null>('auth-user', () => null)

	const fetchProfile = async (): Promise<UserInterface | null> => {
		try {
			const { data } = await $api.get<UserInterface>('/users/profile')
			user.value = data
		} catch {
			user.value = null
		}
		return user.value
	}

	const confirmEmail = async (token: string): Promise<UserInterface> => {
		const { data } = await $api.post<SessionResponseInterface>(
			'/auth/email-confirmation',
			{ token }
		)
		user.value = data.user
		return data.user
	}

	const login = async (payload: LoginPayloadInterface): Promise<LoginResponseType> => {
		const { data } = await $api.post<LoginResponseType>('/auth/login', payload)
		if ('user' in data) {
			user.value = data.user
		}
		return data
	}

	const logout = async (): Promise<void> => {
		await $api.post('/auth/logout')
		user.value = null
	}

	// Бэкенд отдаёт адрес провайдера, сам принимает callback, создаёт сессию
	// и возвращает пользователя на /dashboard/settings.
	const loginWithOAuth = async (provider: OAuthProviderType): Promise<void> => {
		const { data } = await $api.get<{ url: string }>(
			`/auth/oauth/connect/${provider}`
		)
		window.location.href = data.url
	}

	// Регистрация сессию не создаёт: бэкенд присылает письмо, вход выполнит
	// переход по ссылке из него (страница auth/new-verification).
	const register = async (
		payload: RegisterPayloadInterface
	): Promise<MessageResponseInterface> => {
		const { data } = await $api.post<MessageResponseInterface>('/auth/register', payload)
		return data
	}

	// Бэкенд отвечает true и для незарегистрированного email, чтобы не раскрывать,
	// кто зарегистрирован, поэтому результат не возвращается.
	const requestPasswordReset = async (email: string): Promise<void> => {
		await $api.post('/auth/password-recovery/reset', { email })
	}

	// Смена пароля сессию не создаёт и завершает все сессии пользователя на бэкенде.
	const resetPassword = async (token: string, password: string): Promise<void> => {
		await $api.post(`/auth/password-recovery/new/${encodeURIComponent(token)}`, {
			password
		})
	}

	return {
		user,
		fetchProfile,
		confirmEmail,
		login,
		logout,
		loginWithOAuth,
		register,
		requestPasswordReset,
		resetPassword
	}
}
