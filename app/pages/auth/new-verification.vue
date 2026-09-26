<script setup lang="ts">
// Сюда ведёт ссылка из письма: confirmation.template.tsx бэкенда собирает
// `${ALLOWED_ORIGIN}/auth/new-verification?token=...`. Подтверждение email
// создаёт сессию, поэтому после него пользователь сразу авторизован.
const route = useRoute()
const { confirmEmail } = useAuth()

const errors = ref<string[]>([])

const verifyToken = async (): Promise<void> => {
	const token = route.query.token
	if (typeof token !== 'string' || !token) {
		errors.value = ['В ссылке нет токена подтверждения.']
		return
	}
	try {
		await confirmEmail(token)
		await navigateTo('/dashboard/settings', { replace: true })
	} catch (error) {
		errors.value = extractApiErrors(error)
	}
}

onMounted(verifyToken)
</script>

<template>
	<v-container class="d-flex justify-center align-center" style="min-height: 100vh">
		<v-card width="440" class="pa-2">
			<v-card-title class="text-h5 pt-4">Подтверждение email</v-card-title>

			<v-card-text>
				<v-alert v-if="errors.length" type="error" variant="tonal">
					<div v-for="message in errors" :key="message">
						{{ message }}
					</div>
				</v-alert>

				<div v-else class="d-flex align-center ga-4">
					<v-progress-circular indeterminate color="primary" />
					Проверяем ссылку…
				</div>
			</v-card-text>

			<v-card-actions v-if="errors.length">
				<v-btn to="/auth/login" color="primary">Войти</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
