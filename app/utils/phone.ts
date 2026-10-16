// Российский номер: +7 и 10 цифр. В поле вводятся только 10 цифр после префикса +7,
// но вставленный или подставленный браузером номер с 7 или 8 впереди тоже понимается.
const phoneLengthConst = 10

export const extractPhoneDigits = (value: string): string => {
	const digits = value.replace(/\D/g, '')
	const isWithCountryCode = digits.length > phoneLengthConst && /^[78]/.test(digits)
	return (isWithCountryCode ? digits.slice(1) : digits).slice(0, phoneLengthConst)
}

export const isPhoneComplete = (digits: string): boolean => digits.length === phoneLengthConst

// 9165551245 → «916 555-12-45»; неполный номер форматируется по мере ввода.
export const formatPhoneDigits = (digits: string): string => {
	const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)]
	const [code = '', first = '', second = '', third = ''] = parts
	return [code, [first, second, third].filter(Boolean).join('-')].filter(Boolean).join(' ')
}

// Формат E.164, в котором номер хранится на сервере (users.phone).
export const toE164Phone = (digits: string): string => `+7${digits}`

// 9165551245 → «+7 916 ***-**-45»: номер, на который ушёл код, без середины.
export const maskPhoneDigits = (digits: string): string =>
	`+7 ${digits.slice(0, 3)} ***-**-${digits.slice(8, 10)}`
