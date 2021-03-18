
export type Predicate<T> = (value: T) => boolean
export type Validator<T> = (value: T, errorMessage?: string) => boolean | string

export const validatorFactory = <T>(predicate: Predicate<T>, errorMessage: string) => (value: T) => predicate(value) || errorMessage;



export const required: Predicate<any> = toValidate => !!toValidate
export const isEmail: Predicate<string> = email => /^[\w\-\.]*[\w\.]\@[\w\.]*[\w\-\.]+[\w\-]+[\w]\.+[\w]+[\w $]/.test(email)
export const minCharactersFactory = (min: number): Predicate<string> => (str) => str.length >= min
export const maxCharactersFactory = (max: number): Predicate<string> => (str) => str.length <= max
export const mustMatchFactory = <T>(firstValue: T): Predicate<T> => (secondValue) => firstValue === secondValue
export const rangeCharactersFactory = (str: string, min: number, max: number): Predicate<string> => (str) => minCharactersFactory(min)(str) && maxCharactersFactory(max)(str)
export const hasNumbers: Predicate<string> = str =>  /\d/.test(str)
export const hasSpecialCharacters: Predicate<string> = str => /[^A-Za-z0-9]/.test(str)
export const hasUppercaseCharacters: Predicate<string> = str =>  /[A-Z]/.test(str)
export const hasLowercaseCharacters: Predicate<string> = str => /[a-z]/.test(str)
export const inRange= (min?:number, max?:number): Predicate<number> => (num) => (!min || num>=min) && (!max || num<=max)
export const isIban: Predicate<string> = iban => 
/^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i.test(iban)



// export const defaultRequiredValidator: Validator<any> = validatorFactory(required, "Il campo è richiesto")
// export const defaultEmailValidator: Validator<string> = validatorFactory(isEmail, "Il campo deve essere un'email valida")
// export const defaultPhoneNumberValidator: Validator<string> = validatorFactory(isPhoneNumber, "Il campo deve essere un numero di telefono")
// export const defaultHasNumbersValidator: Validator<string> = validatorFactory(hasNumbers, "Il campo deve contenere almeno un numero")
// export const defaultHasSpecialCharacters: Validator<string> = validatorFactory(hasSpecialCharacters, "Il campo deve contenere almeno un carattere speciale")
// export const defaultHasUppercaseCharacters: Validator<string> = validatorFactory(hasUppercaseCharacters, "Il campo deve contenere almeno una lettera maiuscola")
// export const defaultHasLowercaseCharacters: Validator<string> = validatorFactory(hasLowercaseCharacters, "Il campo deve contenere almeno una lettera minuscola")
// export const defaultRangeValidator=(min?:number, max?:number): Validator<number> => validatorFactory(inRange(min,max), "Il campo non appartiene al range di valori accettabili")
