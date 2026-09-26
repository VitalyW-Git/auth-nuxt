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

// Повторяет LoginDto бэкенда: src/modules/auth/presentation/dto/login.dto.ts
export interface LoginPayload {
	email: string
	password: string
	code?: string
}

// Повторяет UserInterface бэкенда: src/modules/user/domain/common/interfaces/user.interface.ts
export interface User {
	id: string
	email: string
	displayName: string
	picture: string | null
	role: string
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: string
	createdAt: string
	updatedAt: string
}

// Ответ SessionService.saveSession: вход и подтверждение email
export interface SessionResponse {
	user: User
}

// Вход с включённой 2FA сначала возвращает только message — код ушёл на почту
export type LoginResponse = SessionResponse | MessageResponse

// Имена провайдеров из AuthProviderGuard бэкенда: /auth/oauth/connect/:provider
export type OAuthProvider = 'google' | 'yandex'
