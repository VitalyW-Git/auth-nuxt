<script setup lang="ts">
const doctors = [
	{ name: 'Анна Смирнова', specialty: 'Стоматолог-терапевт', experience: 'Стаж 12 лет' },
	{ name: 'Игорь Волков', specialty: 'Хирург-имплантолог', experience: 'Стаж 18 лет' },
	{ name: 'Мария Орлова', specialty: 'Ортодонт', experience: 'Стаж 9 лет' },
	{ name: 'Дмитрий Козлов', specialty: 'Ортопед', experience: 'Стаж 15 лет' }
]
</script>

<template>
	<section id="doctors" class="home__section doctors">
		<div class="home__container">
			<HomeSectionHeading
				eyebrow="Наши врачи"
				title="Специалисты, которым доверяют улыбку"
				subtitle="Выберите врача и запишитесь к нему на удобное время."
			/>
			<v-row>
				<v-col v-for="doctor in doctors" :key="doctor.name" cols="12" sm="6" lg="3">
					<div class="doctors__card">
						<!-- Placeholder until real photos are added -->
						<div class="doctors__photo">Фото врача</div>
						<h3 class="doctors__name">{{ doctor.name }}</h3>
						<div class="doctors__specialty">{{ doctor.specialty }}</div>
						<div class="doctors__experience">{{ doctor.experience }}</div>
						<v-btn href="#booking" color="primary" variant="outlined" size="large" block class="mt-4">
							Записаться
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>

