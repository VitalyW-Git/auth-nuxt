<script setup lang="ts">
const reviewsConst = [
	{
		text: 'Боялась стоматологов с детства, а здесь впервые лечила зубы спокойно. Анна Сергеевна всё объясняла на каждом этапе.',
		author: 'Екатерина',
		service: 'Лечение кариеса'
	},
	{
		text: 'Поставил два импланта у Игоря Викторовича. Всё прошло быстро, через неделю забыл, что была операция.',
		author: 'Алексей',
		service: 'Имплантация'
	},
	{
		text: 'Водим сюда детей уже третий год. Врачи находят подход даже к самым капризным, дети идут с радостью.',
		author: 'Ольга',
		service: 'Детская стоматология'
	}
]
</script>

<template>
	<section id="reviews" class="home__section reviews">
		<div class="home__container">
			<HomeSectionHeading eyebrow="Отзывы" title="Что говорят пациенты" />
			<v-row>
				<v-col v-for="review in reviewsConst" :key="review.author" cols="12" md="4">
					<div class="reviews__card">
						<v-rating :model-value="5" color="#FFB547" density="compact" size="small" readonly />
						<p class="reviews__text">{{ review.text }}</p>
						<div class="reviews__author">
							<span class="reviews__avatar">{{ review.author[0] }}</span>
							<div>
								<div class="reviews__author-name">{{ review.author }}</div>
								<div class="reviews__author-service">{{ review.service }}</div>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>

