// Пускает на страницу только пользователя с живой сессией на бэкенде.
export default defineNuxtRouteMiddleware(async () => {
	const { user, fetchProfile } = useAuth()
	if (user.value) {
		return
	}
	const profile = await fetchProfile()
	if (!profile) {
		return navigateTo('/auth/login')
	}
})
