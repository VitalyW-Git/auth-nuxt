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
	email: string | null
	name: string | null
	picture: string | null
	role: string
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: string
	createdAt: string
	updatedAt: string
	phone: string | null
	isPhoneVerified: boolean
}

export interface SessionResponseInterface {
	user: UserInterface
}

export type LoginResponseType = SessionResponseInterface | MessageResponseInterface

export type OAuthProviderType = 'google' | 'yandex'

// Вкладки страницы входа: по коду из SMS или по email и паролю.
export type LoginMethodType = 'phone' | 'email'

// Повторяет PhoneLoginDto (вход по телефону, ADR 0011).
export interface PhoneLoginPayloadInterface {
	phone: string
	code: string
}

// Ответ POST /auth/phone/code. isTestMode — SMS не отправлено, код в логе сервера (только в разработке).
export interface SendPhoneCodeResponseInterface {
	isTestMode: boolean
}
