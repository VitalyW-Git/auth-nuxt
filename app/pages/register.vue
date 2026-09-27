<script setup lang="ts">
import type { RegisterPayloadInterface } from '~/types/auth'

const { register } = useAuth()

const form = ref<RegisterPayloadInterface>({
	name: '',
	email: '',
	password: '',
	passwordRepeat: ''
})

const isValid = ref<boolean | null>(false)
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
		const data = await register(form.value)
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
	<AuthShell panel-title="Личный кабинет пациента">
		<h2 class="auth__title">Регистрация</h2>
		<p class="auth__subtitle">
			Ссылка из письма подтвердит email и сразу выполнит вход
		</p>

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

		<v-form v-model="isValid" class="auth__form" @submit.prevent="onSubmit">
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
				:append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
				hint="Минимум 6 символов"
				persistent-hint
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
				size="x-large"
				block
				flat
				:loading="isLoading"
				:disabled="!isValid"
			>
				Зарегистрироваться
			</v-btn>
		</v-form>

		<AuthOAuth @error="serverErrors = $event" />

		<p class="auth__switch">
			Уже есть аккаунт?
			<NuxtLink to="/auth/login">Войти</NuxtLink>
		</p>
	</AuthShell>
</template>
