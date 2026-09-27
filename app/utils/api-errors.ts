import { AxiosError } from 'axios'

interface NestErrorBodyInterface {
	message?: string | string[]
	error?: string
	statusCode?: number
}

/**
 * ValidationPipe возвращает message массивом строк, остальные исключения Nest —
 * одной строкой. Тексты уже на русском, свои придумывать не нужно.
 */
export const extractApiErrors = (error: unknown): string[] => {
	if (error instanceof AxiosError) {
		const body = error.response?.data as NestErrorBodyInterface | undefined
		if (Array.isArray(body?.message)) {
			return body.message
		}
		if (typeof body?.message === 'string') {
			return [body.message]
		}
		if (error.code === 'ERR_NETWORK') {
			return ['Сервер недоступен. Запущен ли бэкенд на порту 4000?']
		}
	}
	return ['Неизвестная ошибка. Попробуйте позже.']
}
