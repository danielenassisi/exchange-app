import React, { useState } from "react"
import { hasLowercaseCharacters, hasNumbers, hasSpecialCharacters, hasUppercaseCharacters, isEmail, isIban, minCharactersFactory, Predicate, required } from "../utils/validators"


export function useValidation<T = any>(...rules: Predicate<T>[]): [boolean, React.Dispatch<React.SetStateAction<boolean>>, Predicate<T>] {
  const [changed, setChanged] = useState(false)

  const validator = rules.reduce((acc, curr) => value => acc(value) && curr(value), () => true)

  return [
    changed,
    setChanged,
    validator
  ]
}

export function usePasswordValidation() {
  return useValidation<string>(
    required,
    minCharactersFactory(8),
    hasLowercaseCharacters,
    hasUppercaseCharacters,
    hasSpecialCharacters,
    hasNumbers
  )
}

export function useEmailValidation() {
  return useValidation<string>(required, isEmail)
}

export function useIbanValidation() {
  return useValidation<string>(required, isIban)
}
