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
	<v-container class="d-flex justify-center align-center" style="min-height: 100vh">
		<v-card width="440" class="pa-2">
			<v-card-title class="text-h5 pt-4">Вход</v-card-title>

			<v-card-text>
				<v-alert
					v-if="infoMessage"
					type="info"
					variant="tonal"
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

				<v-form v-model="isValid" @submit.prevent="onSubmit">
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
						:append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
						@click:append-inner="isPasswordVisible = !isPasswordVisible"
					/>

					<v-text-field
						v-if="isCodeRequired"
						v-model="form.code"
						label="Код из письма"
						autocomplete="one-time-code"
						prepend-inner-icon="mdi-shield-key-outline"
					/>

					<v-btn
						type="submit"
						color="primary"
						size="large"
						block
						class="mt-2"
						:loading="isLoading"
						:disabled="!isValid"
					>
						Войти
					</v-btn>
				</v-form>
			</v-card-text>

			<v-card-actions class="justify-center">
				Нет аккаунта?
				<v-btn to="/register" variant="text" color="primary">
					Регистрация
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
