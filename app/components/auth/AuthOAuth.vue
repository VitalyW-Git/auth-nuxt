<script setup lang="ts">
import type { OAuthProvider } from '~/types/auth'

const emit = defineEmits<{
	error: [messages: string[]]
}>()

const { loginWithOAuth } = useAuth()

const loadingProvider = ref<OAuthProvider | null>(null)

const providers: { id: OAuthProvider, title: string, letter: string }[] = [
	{ id: 'google', title: 'Google', letter: 'G' },
	{ id: 'yandex', title: 'Яндекс', letter: 'Я' }
]

// On success the browser leaves the page, so the spinner is reset only on error.
const onClick = async (provider: OAuthProvider): Promise<void> => {
	emit('error', [])
	loadingProvider.value = provider
	try {
		await loginWithOAuth(provider)
	} catch (error) {
		emit('error', extractApiErrors(error))
		loadingProvider.value = null
	}
}
</script>

<template>
	<div class="auth__divider">или</div>

	<div class="auth__oauth">
		<v-btn
			v-for="provider in providers"
			:key="provider.id"
			variant="outlined"
			size="x-large"
			class="auth__oauth-btn"
			:class="`auth__oauth-btn--${provider.id}`"
			:loading="loadingProvider === provider.id"
			:disabled="loadingProvider !== null"
			@click="onClick(provider.id)"
		>
			<span class="auth__oauth-letter">{{ provider.letter }}</span>
			{{ provider.title }}
		</v-btn>
	</div>
</template>
