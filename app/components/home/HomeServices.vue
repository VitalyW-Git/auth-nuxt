<script setup lang="ts">
const servicesConst = [
	{
		icon: 'mdi-tooth-outline',
		title: 'Терапия',
		text: 'Лечение кариеса и каналов под микроскопом',
		price: 'от 3 500 ₽'
	},
	{
		icon: 'mdi-screw-flat-top',
		title: 'Имплантация',
		text: 'Импланты Straumann и Osstem с гарантией',
		price: 'от 35 000 ₽'
	},
	{
		icon: 'mdi-emoticon-happy-outline',
		title: 'Ортодонтия',
		text: 'Брекеты и элайнеры для детей и взрослых',
		price: 'от 90 000 ₽'
	},
	{
		icon: 'mdi-crown-outline',
		title: 'Протезирование',
		text: 'Коронки и виниры из керамики и циркония',
		price: 'от 18 000 ₽'
	},
	{
		icon: 'mdi-water-outline',
		title: 'Гигиена',
		text: 'Профессиональная чистка Air Flow',
		price: 'от 4 900 ₽'
	},
	{
		icon: 'mdi-teddy-bear',
		title: 'Детская стоматология',
		text: 'Бережное лечение в игровой форме',
		price: 'от 2 500 ₽'
	}
]
</script>

<template>
	<section id="services" class="home__section services">
		<div class="home__container">
			<HomeSectionHeading
				eyebrow="Услуги"
				title="Полный спектр стоматологии в одной клинике"
				subtitle="От профилактики до сложной имплантации — без направлений в другие клиники."
			/>
			<v-row>
				<v-col v-for="item in servicesConst" :key="item.title" cols="12" sm="6" md="4">
					<div class="services__card">
						<span class="icon-tile">
							<v-icon :icon="item.icon" color="primary" size="28" />
						</span>
						<h3 class="services__title">{{ item.title }}</h3>
						<p class="services__text">{{ item.text }}</p>
						<div class="services__footer">
							<span class="services__price">{{ item.price }}</span>
							<a href="#booking" class="services__more">Подробнее →</a>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>

