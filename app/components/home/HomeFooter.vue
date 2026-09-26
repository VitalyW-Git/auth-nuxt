<script setup lang="ts">
const columns = [
	{ title: 'Клиника', links: ['О нас', 'Врачи', 'Лицензии', 'Вакансии'] },
	{ title: 'Пациентам', links: ['Услуги и цены', 'Отзывы', 'Рассрочка', 'Личный кабинет'] },
	{
		title: 'Контакты',
		links: ['+7 (495) 123-45-67', 'Москва, ул. Тверская, 12', 'Ежедневно 9:00–21:00', 'info@dentalux.ru']
	}
]
</script>

<template>
	<footer id="contacts" class="footer">
		<div class="home__container">
			<v-row>
				<v-col cols="12" md="4">
					<div class="logo">
						<span class="logo__mark" />
						ДентаЛюкс
					</div>
					<p class="footer__about">Современная стоматология для всей семьи</p>
				</v-col>
				<v-col v-for="column in columns" :key="column.title" cols="12" sm="4" md="">
					<div class="footer__column-title">{{ column.title }}</div>
					<div v-for="link in column.links" :key="link" class="footer__link">{{ link }}</div>
				</v-col>
			</v-row>
			<div class="footer__bottom">
				<span>© 2026 ДентаЛюкс. Лицензия № ЛО-77-01-000000</span>
				<span>Политика конфиденциальности</span>
			</div>
		</div>
	</footer>
</template>

