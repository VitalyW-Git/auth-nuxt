<script setup lang="ts">
// Страница только для авторизованных. Путь /dashboard/settings выбран потому,
// что туда же редиректит OAuth-callback бэкенда (auth.controller.ts).
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()

const isLoading = ref(false)
const errors = ref<string[]>([])

const onLogout = async (): Promise<void> => {
	errors.value = []
	isLoading.value = true
	try {
		await logout()
		await navigateTo('/auth/login', { replace: true })
	} catch (error) {
		errors.value = extractApiErrors(error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<v-container class="d-flex justify-center align-center" style="min-height: 100vh">
		<v-card v-if="user" width="440" class="pa-2">
			<v-card-title class="text-h5 pt-4">
				Здравствуйте, {{ user.displayName }}
			</v-card-title>
			<v-card-subtitle>Эта страница доступна только после входа</v-card-subtitle>

			<v-card-text>
				<v-alert
					v-if="errors.length"
					type="error"
					variant="tonal"
					class="mb-4"
				>
					<div v-for="message in errors" :key="message">
						{{ message }}
					</div>
				</v-alert>

				<v-list density="compact">
					<v-list-item title="Email" :subtitle="user.email" />
					<v-list-item title="Роль" :subtitle="user.role" />
					<v-list-item
						title="Email подтверждён"
						:subtitle="user.isVerified ? 'Да' : 'Нет'"
					/>
					<v-list-item
						title="Двухфакторная аутентификация"
						:subtitle="user.isTwoFactorEnabled ? 'Включена' : 'Выключена'"
					/>
				</v-list>
			</v-card-text>

			<v-card-actions>
				<v-btn color="error" variant="tonal" :loading="isLoading" @click="onLogout">
					Выйти
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
