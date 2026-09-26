<script setup lang="ts">
defineProps<{
	eyebrow: string
	title: string
	subtitle?: string
}>()
</script>

<template>
	<div class="section-heading">
		<div class="section-heading__eyebrow">{{ eyebrow }}</div>
		<h2 class="section-heading__title">{{ title }}</h2>
		<p v-if="subtitle" class="section-heading__subtitle">{{ subtitle }}</p>
	</div>
</template>
