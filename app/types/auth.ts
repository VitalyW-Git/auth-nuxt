// Повторяет RegisterDto бэкенда: src/modules/auth/presentation/dto/register.dto.ts
export interface RegisterPayloadInterface {
	name: string
	email: string
	password: string
	passwordRepeat: string
}

// Ответ RegisterHandler: { message: string }
export interface MessageResponseInterface {
	message: string
}

// Повторяет LoginDto бэкенда: src/modules/auth/presentation/dto/login.dto.ts
export interface LoginPayloadInterface {
	email: string
	password: string
	code?: string
}

// Повторяет UserInterface бэкенда: src/modules/user/domain/common/interfaces/user.interface.ts
export interface UserInterface {
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

export interface SessionResponseInterface {
	user: UserInterface
}

export type LoginResponseType = SessionResponseInterface | MessageResponseInterface

export type OAuthProviderType = 'google' | 'yandex'
