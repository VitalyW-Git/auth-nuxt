// Повторяет RegisterDto бэкенда: src/modules/auth/presentation/dto/register.dto.ts
export interface RegisterPayload {
	name: string
	email: string
	password: string
	passwordRepeat: string
}

// Ответ RegisterHandler: { message: string }
export interface MessageResponse {
	message: string
}
