<script setup lang="ts">
// Вход по телефону: номер → код из SMS. Макеты Penpot «Login — Phone» и «Login — Phone code».
const emit = defineEmits<{
	error: [messages: string[]]
}>()

// Шаг ввода кода: на нём страница прячет переключатель, OAuth и ссылку на регистрацию.
const isCodeStep = defineModel<boolean>('codeStep', { required: true })

const { sendPhoneCode, loginWithPhone } = useAuth()

const codeLengthConst = 4
const resendDelayConst = 60

const phoneDigits = ref('')
const code = ref('')
const isValid = ref<boolean | null>(false)
const isLoading = ref(false)
const secondsLeft = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)

// DTO на бэкенде ещё нет: при его появлении сверить тексты и перенести их оттуда.
const phoneRules = [
	(v: string) => !!v || 'Телефон обязателен для заполнения.',
	(v: string) => isPhoneComplete(extractPhoneDigits(v)) || 'Введите 10 цифр номера после +7.'
]

// В поле — номер с пробелом и дефисами, в состоянии — только цифры.
const phoneView = computed({
	get: (): string => formatPhoneDigits(phoneDigits.value),
	set: (value: string): void => {
		phoneDigits.value = extractPhoneDigits(value)
	}
})

const maskedPhone = computed((): string => maskPhoneDigits(phoneDigits.value))
const isCodeComplete = computed((): boolean => code.value.length === codeLengthConst)
const resendLabel = computed((): string => {
	const seconds = String(secondsLeft.value % 60).padStart(2, '0')
	return `${Math.floor(secondsLeft.value / 60)}:${seconds}`
})

const stopTimer = (): void => {
	if (timerId.value) {
		clearInterval(timerId.value)
	}
	timerId.value = null
}

const onTick = (): void => {
	secondsLeft.value -= 1
	if (secondsLeft.value <= 0) {
		stopTimer()
	}
}

const startTimer = (): void => {
	stopTimer()
	secondsLeft.value = resendDelayConst
	timerId.value = setInterval(onTick, 1000)
}

// Повторная отправка — тот же запрос: бэкенд заменяет прежний код новым.
const requestCode = async (): Promise<void> => {
	emit('error', [])
	isLoading.value = true
	try {
		await sendPhoneCode(toE164Phone(phoneDigits.value))
		code.value = ''
		isCodeStep.value = true
		startTimer()
	} catch (error) {
		emit('error', extractApiErrors(error))
	} finally {
		isLoading.value = false
	}
}

const onSubmitCode = async (): Promise<void> => {
	if (!isCodeComplete.value || isLoading.value) {
		return
	}
	emit('error', [])
	isLoading.value = true
	try {
		await loginWithPhone({ phone: toE164Phone(phoneDigits.value), code: code.value })
		await navigateTo('/dashboard/settings', { replace: true })
	} catch (error) {
		emit('error', extractApiErrors(error))
		code.value = ''
	} finally {
		isLoading.value = false
	}
}

const onChangePhone = (): void => {
	stopTimer()
	emit('error', [])
	code.value = ''
	isCodeStep.value = false
}

onBeforeUnmount(stopTimer)
</script>

<template>
	<v-form
		v-if="!isCodeStep"
		v-model="isValid"
		class="auth__form"
		@submit.prevent="requestCode"
	>
		<v-text-field
			v-model="phoneView"
			label="Телефон"
			type="tel"
			inputmode="tel"
			autocomplete="tel"
			prefix="+7"
			:rules="phoneRules"
			prepend-inner-icon="mdi-cellphone"
			hint="Пришлём код в SMS. Если аккаунта с этим номером ещё нет — создадим его после подтверждения."
			persistent-hint
			class="auth__phone"
		/>

		<v-btn
			type="submit"
			color="primary"
			size="x-large"
			block
			flat
			:loading="isLoading"
			:disabled="!isValid"
		>
			Получить код
		</v-btn>
	</v-form>

	<template v-else>
		<p class="auth__subtitle auth__subtitle--code">
			Отправили код из {{ codeLengthConst }} цифр на
			<span class="auth__nowrap">{{ maskedPhone }}</span>.
		</p>

		<button type="button" class="auth__link-btn auth__change-phone" @click="onChangePhone">
			Изменить номер
		</button>

		<v-form class="auth__form" @submit.prevent="onSubmitCode">
			<v-otp-input
				v-model="code"
				:length="codeLengthConst"
				variant="outlined"
				label="Код из SMS"
				autocomplete="one-time-code"
				class="auth__code"
				:disabled="isLoading"
				autofocus
				@finish="onSubmitCode"
			/>

			<p class="auth__timer">
				<template v-if="secondsLeft > 0">
					Отправить код повторно через {{ resendLabel }}
				</template>
				<button
					v-else
					type="button"
					class="auth__link-btn"
					:disabled="isLoading"
					@click="requestCode"
				>
					Отправить код повторно
				</button>
			</p>

			<v-btn
				type="submit"
				color="primary"
				size="x-large"
				block
				flat
				:loading="isLoading"
				:disabled="!isCodeComplete"
			>
				Войти
			</v-btn>
		</v-form>
	</template>
</template>
