<script setup lang="ts">
// Переключатель способа входа, макет Penpot «Login — Phone — Desktop 1440».
import type { LoginMethodType } from '~/types/auth'

const method = defineModel<LoginMethodType>({ required: true })

const tabsConst: { id: LoginMethodType, title: string }[] = [
	{ id: 'phone', title: 'Телефон' },
	{ id: 'email', title: 'Email' }
]

const onSelect = (id: LoginMethodType): void => {
	method.value = id
}
</script>

<template>
	<div class="auth__tabs" role="group" aria-label="Способ входа">
		<button
			v-for="tab in tabsConst"
			:key="tab.id"
			type="button"
			class="auth__tab"
			:class="{ 'auth__tab--active': method === tab.id }"
			:aria-pressed="method === tab.id"
			@click="onSelect(tab.id)"
		>
			{{ tab.title }}
		</button>
	</div>
</template>
