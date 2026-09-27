<script setup lang="ts">
const benefitsConst = [
	{
		icon: 'mdi-hand-heart-outline',
		title: 'Лечение без боли',
		text: 'Современная анестезия и седация для самых тревожных пациентов.'
	},
	{
		icon: 'mdi-shield-check-outline',
		title: 'Гарантия до 10 лет',
		text: 'Письменная гарантия на импланты, коронки и реставрации.'
	},
	{
		icon: 'mdi-cube-scan',
		title: 'Цифровая диагностика',
		text: '3D-томограф и интраоральный сканер в клинике.'
	},
	{
		icon: 'mdi-percent-outline',
		title: 'Рассрочка 0%',
		text: 'Лечение сейчас — оплата частями без переплат.'
	}
]
</script>

<template>
	<section class="benefits">
		<div class="home__container">
			<v-row>
				<v-col v-for="item in benefitsConst" :key="item.title" cols="12" sm="6" lg="3">
					<div class="benefits__card">
						<span class="icon-tile">
							<v-icon :icon="item.icon" color="primary" size="28" />
						</span>
						<h3 class="benefits__title">{{ item.title }}</h3>
						<p class="benefits__text">{{ item.text }}</p>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>

