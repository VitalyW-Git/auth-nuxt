<script setup lang="ts">
const services = [
	'Терапия',
	'Имплантация',
	'Ортодонтия',
	'Протезирование',
	'Гигиена',
	'Детская стоматология'
]

const form = ref({ name: '', phone: '', service: null as string | null })
const isValid = ref(false)
const isSubmitted = ref(false)

const requiredRule = (v: string | null): boolean | string => !!v || 'Поле обязательно для заполнения.'
const phoneRule = (v: string): boolean | string =>
	v.replace(/\D/g, '').length >= 10 || 'Укажите телефон полностью.'

// TODO: отправлять заявку, когда у бэкенда появится эндпоинт записи на приём.
// Пока форма только проверяет поля и честно об этом сообщает.
const onSubmit = (): void => {
	isSubmitted.value = true
}
</script>

<template>
	<section id="booking" class="booking">
		<div class="home__container">
			<div class="booking__card">
				<v-row align="center">
					<v-col cols="12" md="6">
						<h2 class="booking__title">Запишитесь на бесплатную консультацию</h2>
						<p class="booking__lead">Осмотр, план лечения и точная смета — бесплатно при записи онлайн.</p>
					</v-col>
					<v-col cols="12" md="6">
						<v-form v-model="isValid" class="booking__form" @submit.prevent="onSubmit">
							<v-alert
								v-if="isSubmitted"
								type="info"
								variant="tonal"
								class="mb-4"
								text="Онлайн-запись скоро заработает. Пока позвоните нам: +7 (495) 123-45-67."
							/>
							<v-text-field v-model="form.name" label="Ваше имя" :rules="[requiredRule]" />
							<v-text-field
								v-model="form.phone"
								label="Телефон"
								type="tel"
								:rules="[requiredRule, phoneRule]"
							/>
							<v-select
								v-model="form.service"
								label="Услуга"
								:items="services"
								:rules="[requiredRule]"
								variant="outlined"
								density="comfortable"
							/>
							<v-btn type="submit" color="primary" size="x-large" block flat :disabled="!isValid">
								Записаться на консультацию
							</v-btn>
							<p class="booking__consent">
								Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
							</p>
						</v-form>
					</v-col>
				</v-row>
			</div>
		</div>
	</section>
</template>

