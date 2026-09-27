<script setup lang="ts">
const { user, fetchProfile } = useAuth()

const linksConst = [
	{ title: 'Услуги', href: '#services' },
	{ title: 'Врачи', href: '#doctors' },
	{ title: 'Цены', href: '#services' },
	{ title: 'Отзывы', href: '#reviews' },
	{ title: 'Контакты', href: '#contacts' }
]

// Главная открыта всем, поэтому сессию проверяем мягко: гостю /users/profile
// ответит 401, и в шапке останется кнопка «Войти».
onMounted(async () => {
	if (!user.value) {
		await fetchProfile()
	}
})
</script>

<template>
	<header class="header">
		<div class="home__container header__inner">
			<NuxtLink to="/" class="logo">
				<span class="logo__mark" />
				ДентаЛюкс
			</NuxtLink>

			<nav class="header__nav d-none d-lg-flex">
				<a v-for="link in linksConst" :key="link.title" :href="link.href" class="header__link">
					{{ link.title }}
				</a>
			</nav>

			<div class="header__actions">
				<a href="tel:+74951234567" class="header__phone d-none d-md-inline">+7 (495) 123-45-67</a>
				<v-btn
					v-if="user"
					to="/dashboard/settings"
					variant="outlined"
					color="primary"
					size="large"
					class="d-none d-sm-flex"
				>
					Кабинет
				</v-btn>
				<v-btn
					v-else
					to="/auth/login"
					variant="outlined"
					color="primary"
					size="large"
					class="d-none d-sm-flex"
				>
					Войти
				</v-btn>
				<v-btn href="#booking" color="primary" size="large" flat>Записаться</v-btn>

				<v-menu>
					<template #activator="{ props }">
						<v-btn
							v-bind="props"
							icon="mdi-menu"
							variant="text"
							class="d-lg-none"
							aria-label="Открыть меню"
						/>
					</template>
					<v-list>
						<v-list-item
							v-for="link in linksConst"
							:key="link.title"
							:href="link.href"
							:title="link.title"
						/>
						<v-list-item
							:to="user ? '/dashboard/settings' : '/auth/login'"
							:title="user ? 'Кабинет' : 'Войти'"
							class="d-sm-none"
						/>
					</v-list>
				</v-menu>
			</div>
		</div>
	</header>
</template>
