<script setup lang="ts">
import type { MessageResponse, RegisterPayload } from '~/types/auth'

const { $api } = useNuxtApp()

const form = ref<RegisterPayload>({
	name: '',
	email: '',
	password: '',
	passwordRepeat: ''
})

const isValid = ref(false)
const isLoading = ref(false)
const isPasswordVisible = ref(false)
const serverErrors = ref<string[]>([])
const successMessage = ref('')

// Правила повторяют RegisterDto бэкенда, тексты взяты оттуда же.
const required = (field: string) => (v: string) =>
	!!v || `${field} обязательно для заполнения.`

const nameRules = [required('Имя')]

const emailRules = [
	required('Email'),
	(v: string) => /.+@.+\..+/.test(v) || 'Некорректный формат email.'
]

const passwordRules = [
	(v: string) => !!v || 'Пароль обязателен для заполнения.',
	(v: string) => v.length >= 6 || 'Пароль должен содержать минимум 6 символов.'
]

const passwordRepeatRules = [
	(v: string) => !!v || 'Поле подтверждения пароля не может быть пустым.',
	(v: string) => v === form.value.password || 'Пароли не совпадают.'
]

const onSubmit = async (): Promise<void> => {
	serverErrors.value = []
	successMessage.value = ''
	isLoading.value = true
	try {
		const { data } = await $api.post<MessageResponse>(
			'/auth/register',
			form.value
		)
		successMessage.value = data.message
		form.value = { name: '', email: '', password: '', passwordRepeat: '' }
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
			<v-card-title class="text-h5 pt-4">Регистрация</v-card-title>
			<v-card-subtitle>
				Ссылка из письма подтвердит email и сразу выполнит вход
			</v-card-subtitle>

			<v-card-text>
				<v-alert
					v-if="successMessage"
					type="success"
					variant="tonal"
					class="mb-4"
					:text="successMessage"
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
						v-model="form.name"
						label="Имя"
						:rules="nameRules"
						autocomplete="name"
						prepend-inner-icon="mdi-account-outline"
					/>

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
						autocomplete="new-password"
						prepend-inner-icon="mdi-lock-outline"
						:append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
						@click:append-inner="isPasswordVisible = !isPasswordVisible"
					/>

					<v-text-field
						v-model="form.passwordRepeat"
						label="Повторите пароль"
						:type="isPasswordVisible ? 'text' : 'password'"
						:rules="passwordRepeatRules"
						autocomplete="new-password"
						prepend-inner-icon="mdi-lock-check-outline"
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
						Зарегистрироваться
					</v-btn>
				</v-form>
			</v-card-text>

			<v-card-actions class="justify-center">
				Уже есть аккаунт?
				<v-btn to="/auth/login" variant="text" color="primary">
					Войти
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
