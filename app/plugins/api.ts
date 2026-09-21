import axios, { type AxiosInstance } from 'axios'

// Сессия бэкенда живёт в cookie, а не в токене, поэтому withCredentials
// обязателен: без него cookie `session` не уедет и не вернётся.
export default defineNuxtPlugin(() => {
	const { apiBase } = useRuntimeConfig().public

	const api: AxiosInstance = axios.create({
		baseURL: apiBase,
		withCredentials: true,
		headers: { 'Content-Type': 'application/json' }
	})

	return {
		provide: { api }
	}
})
