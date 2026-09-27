<script setup lang="ts">
// Первый шаг восстановления: бэкенд создаёт токен на час и присылает письмо
// со ссылкой на /auth/new-password?token=... Ответ — просто true, без message,
// поэтому текст экрана «Проверьте почту» живёт на клиенте.
const { requestPasswordReset } = useAuth()

const email = ref('')
const sentTo = ref('')
const isValid = ref<boolean | null>(false)
const isLoading = ref(false)
const serverErrors = ref<string[]>([])

// Правила повторяют ResetPasswordDto бэкенда, тексты взяты оттуда же.
const emailRules = [
	(v: string) => !!v || 'Поле email не может быть пустым.',
	(v: string) => /.+@.+\..+/.test(v) || 'Введите корректный адрес электронной почты.'
]

const requestLink = async (address: string): Promise<void> => {
	serverErrors.value = []
	isLoading.value = true
	try {
		await requestPasswordReset(address)
		sentTo.value = address
	} catch (error) {
		serverErrors.value = extractApiErrors(error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<AuthShell panel-title="Вернём доступ к кабинету">
		<div v-if="sentTo" class="auth__status">
			<span class="auth__status-icon">
				<v-icon icon="mdi-email-outline" size="34" />
			</span>
			<h2 class="auth__title">Проверьте почту</h2>
			<p class="auth__subtitle">
				Мы отправили ссылку для сброса пароля на <b>{{ sentTo }}</b>.
				Откройте письмо и перейдите по ссылке.
			</p>

			<v-alert
				v-if="serverErrors.length"
				type="error"
				variant="tonal"
				class="mb-4 text-left"
			>
				<div v-for="message in serverErrors" :key="message">
					{{ message }}
				</div>
			</v-alert>

			<v-btn to="/auth/login" variant="outlined" size="x-large" block class="auth__secondary-btn">
				Вернуться ко входу
			</v-btn>
			<p class="auth__switch">
				Не пришло письмо?
				<button
					type="button"
					class="auth__link-btn"
					:disabled="isLoading"
					@click="requestLink(sentTo)"
				>
					Отправить ещё раз
				</button>
			</p>
		</div>

		<template v-else>
			<h2 class="auth__title">Восстановление пароля</h2>
			<p class="auth__subtitle">
				Укажите email, с которым вы регистрировались. Мы пришлём ссылку для сброса пароля.
			</p>

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

			<v-form v-model="isValid" class="auth__form" @submit.prevent="requestLink(email)">
				<v-text-field
					v-model="email"
					label="Email"
					type="email"
					:rules="emailRules"
					autocomplete="email"
					prepend-inner-icon="mdi-email-outline"
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
					Отправить ссылку
				</v-btn>
			</v-form>

			<p class="auth__switch">
				Вспомнили пароль?
				<NuxtLink to="/auth/login">Войти</NuxtLink>
			</p>
		</template>
	</AuthShell>
</template>
