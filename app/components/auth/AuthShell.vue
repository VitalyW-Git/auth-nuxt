<script setup lang="ts">
// Общий каркас страниц авторизации, фреймы Figma «Register / Login — Desktop 1440».
defineProps<{
	panelTitle: string
}>()

const perksConst = [
	'Онлайн-запись к любому врачу за минуту',
	'История визитов, снимки и план лечения',
	'Напоминания о приёме на почту'
]
</script>

<template>
	<v-theme-provider theme="clinic" with-background class="auth">
		<aside class="auth__panel d-none d-md-flex">
			<NuxtLink to="/" class="auth__logo">
				<span class="auth__logo-mark" />
				ДентаЛюкс
			</NuxtLink>

			<div class="auth__pitch">
				<h1 class="auth__pitch-title">{{ panelTitle }}</h1>
				<p class="auth__pitch-text">Один аккаунт — и вся ваша стоматология под рукой.</p>
				<ul class="auth__perks">
					<li v-for="perk in perksConst" :key="perk" class="auth__perk">
						<span class="auth__check">
							<v-icon icon="mdi-check" size="16" />
						</span>
						{{ perk }}
					</li>
				</ul>
			</div>

			<figure class="auth__quote">
				<blockquote>
					«Записываюсь к своему врачу из кабинета за пару кликов и больше не звоню администратору»
				</blockquote>
				<figcaption class="auth__quote-author">
					<span class="auth__quote-avatar">Е</span>
					<span>
						<b>Екатерина</b>
						<small>пациент с 2021 года</small>
					</span>
				</figcaption>
			</figure>
		</aside>

		<main class="auth__side">
			<NuxtLink to="/" class="auth__back">← На главную</NuxtLink>
			<div class="auth__card">
				<slot />
			</div>
		</main>
	</v-theme-provider>
</template>

<style lang="scss" src="~/assets/styles/auth.scss"></style>
