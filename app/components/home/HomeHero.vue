<script setup lang="ts">
const stats = [
	{ value: '4.9', label: 'рейтинг на картах' },
	{ value: '12 000+', label: 'довольных пациентов' },
	{ value: '15 лет', label: 'опыта работы' }
]
</script>

<template>
	<section class="hero">
		<div class="home__container">
			<v-row align="center">
				<v-col cols="12" md="6" class="hero__text">
					<span class="hero__badge">Стоматология в центре города с 2010 года</span>
					<h1 class="hero__title">Здоровая улыбка без страха и боли</h1>
					<p class="hero__lead">
						Лечение, имплантация и эстетика зубов под контролем опытных врачей.
						Запишитесь онлайн за минуту — мы подтвердим время по телефону.
					</p>
					<div class="hero__buttons">
						<v-btn href="#booking" color="primary" size="x-large" flat>Записаться на приём</v-btn>
						<v-btn href="#services" color="primary" variant="outlined" size="x-large">
							Наши услуги
						</v-btn>
					</div>
					<div class="hero__stats">
						<div v-for="stat in stats" :key="stat.label">
							<div class="hero__stat-value">{{ stat.value }}</div>
							<div class="hero__stat-label">{{ stat.label }}</div>
						</div>
					</div>
				</v-col>

				<v-col cols="12" md="6">
					<div class="hero__picture">
						<!-- Placeholder until a real photo is added -->
						<span class="hero__picture-label">Фото врача с пациентом</span>
						<div class="hero__slot">
							<span class="icon-tile">
								<v-icon icon="mdi-calendar-clock" color="primary" />
							</span>
							<div>
								<div class="hero__slot-caption">Ближайшая запись</div>
								<div class="hero__slot-time">Сегодня, 16:30</div>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>
