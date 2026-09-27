<script setup lang="ts">
const stepsConst = [
	{
		number: '01',
		title: 'Выберите услугу',
		text: 'Или врача — если уже знаете, к кому хотите попасть.'
	},
	{
		number: '02',
		title: 'Укажите время',
		text: 'Свободные окна видны сразу, без звонков администратору.'
	},
	{
		number: '03',
		title: 'Получите подтверждение',
		text: 'Письмо и напоминание придут накануне визита.'
	}
]
</script>

<template>
	<section class="home__section steps">
		<div class="home__container">
			<HomeSectionHeading eyebrow="Как записаться" title="Три шага до приёма" />
			<v-row>
				<v-col v-for="step in stepsConst" :key="step.number" cols="12" md="4">
					<div class="steps__card">
						<div class="steps__number">{{ step.number }}</div>
						<h3 class="steps__title">{{ step.title }}</h3>
						<p class="steps__text">{{ step.text }}</p>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>

