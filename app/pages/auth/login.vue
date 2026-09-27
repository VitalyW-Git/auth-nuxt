<script setup lang="ts">
import type { LoginPayload } from '~/types/auth'

const { login } = useAuth()

const form = ref<LoginPayload>({ email: '', password: '', code: '' })

const isValid = ref(false)
const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isCodeRequired = ref(false)
const serverErrors = ref<string[]>([])
const infoMessage = ref('')

// Правила повторяют LoginDto бэкенда, тексты взяты оттуда же.
const emailRules = [
	(v: string) => !!v || 'Email обязателен для заполнения.',
	(v: string) => /.+@.+\..+/.test(v) || 'Некорректный формат email.'
]

const passwordRules = [
	(v: string) => !!v || 'Поле пароль не может быть пустым.',
	(v: string) => v.length >= 6 || 'Пароль должен содержать не менее 6 символов.'
]

const onSubmit = async (): Promise<void> => {
	serverErrors.value = []
	infoMessage.value = ''
	isLoading.value = true
	try {
		const data = await login(form.value)
		if ('user' in data) {
			await navigateTo('/dashboard/settings', { replace: true })
			return
		}
		// Включена 2FA: код ушёл на почту, форму отправляют ещё раз вместе с ним.
		isCodeRequired.value = true
		infoMessage.value = data.message
	} catch (error) {
		serverErrors.value = extractApiErrors(error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<AuthShell panel-title="С возвращением!">
		<h2 class="auth__title">Вход</h2>
		<p class="auth__subtitle">
			Рады видеть вас снова. Войдите по email и паролю или через Google и Яндекс.
		</p>

		<v-alert
			v-if="infoMessage"
			type="info"
			variant="tonal"
			color="primary"
			class="mb-4"
			:text="infoMessage"
		/>

		<v-alert
			v-if="serverErrors.length"
			type="error"
			variant="tonal"
			class="mb-4"
		>
			<div v-for="message in serverErrors" :key="message">
				{{ message }}
			</div>
		</v-alert>

		<v-form v-model="isValid" class="auth__form" @submit.prevent="onSubmit">
			<v-text-field
				v-model="form.email"
				label="Email"
				type="email"
				:rules="emailRules"
				autocomplete="email"
				prepend-inner-icon="mdi-email-outline"
			/>

			<v-text-field
				v-model="form.password"
				label="Пароль"
				:type="isPasswordVisible ? 'text' : 'password'"
				:rules="passwordRules"
				autocomplete="current-password"
				prepend-inner-icon="mdi-lock-outline"
				:append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
				@click:append-inner="isPasswordVisible = !isPasswordVisible"
			/>

			<NuxtLink v-if="!isCodeRequired" to="/auth/reset-password" class="auth__forgot">
				Забыли пароль?
			</NuxtLink>

			<v-text-field
				v-if="isCodeRequired"
				v-model="form.code"
				label="Код из письма"
				autocomplete="one-time-code"
				inputmode="numeric"
				prepend-inner-icon="mdi-shield-key-outline"
				autofocus
			/>

			<v-btn
				type="submit"
				color="primary"
				size="x-large"
				block
				flat
				:loading="isLoading"
				:disabled="!isValid"
			>
				Войти
			</v-btn>
		</v-form>

		<AuthOAuth @error="serverErrors = $event" />

		<p class="auth__switch">
			Нет аккаунта?
			<NuxtLink to="/register">Регистрация</NuxtLink>
		</p>
	</AuthShell>
</template>
