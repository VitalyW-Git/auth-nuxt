import type {
	LoginPayload,
	LoginResponse,
	SessionResponse,
	User
} from '~/types/auth'

// Сессия живёт в httpOnly cookie, прочитать её из JS нельзя. Единственный
// способ узнать, вошёл ли пользователь, — спросить защищённый /users/profile.
export const useAuth = () => {
	const { $api } = useNuxtApp()
	const user = useState<User | null>('auth-user', () => null)

	const fetchProfile = async (): Promise<User | null> => {
		try {
			const { data } = await $api.get<User>('/users/profile')
			user.value = data
		} catch {
			user.value = null
		}
		return user.value
	}

	const confirmEmail = async (token: string): Promise<User> => {
		const { data } = await $api.post<SessionResponse>(
			'/auth/email-confirmation',
			{ token }
		)
		user.value = data.user
		return data.user
	}

	const login = async (payload: LoginPayload): Promise<LoginResponse> => {
		const { data } = await $api.post<LoginResponse>('/auth/login', payload)
		if ('user' in data) {
			user.value = data.user
		}
		return data
	}

	const logout = async (): Promise<void> => {
		await $api.post('/auth/logout')
		user.value = null
	}

	return { user, fetchProfile, confirmEmail, login, logout }
}
