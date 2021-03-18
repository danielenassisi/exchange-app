import { TextField } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useValidation } from '../hooks/useValidation'
import { required, isEmail, Predicate } from "../utils/validators"

interface EmailTextFieldProps {
  email: string, 
  onEmailChange: React.Dispatch<React.SetStateAction<string>>,
  validation: [boolean, React.Dispatch<React.SetStateAction<boolean>>, Predicate<string>]
}

const EmailTextField: FC<EmailTextFieldProps> = ({email, onEmailChange, validation}) => {
  const [changed, setChanged, emailValidator] = validation


  return (
    <TextField
      error={!emailValidator(email) && changed}
      value={email}
      onChange={e => {
        setChanged(true)
        onEmailChange(e.target.value)
      }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Indirizzo email"
      name="email"
      autoComplete="email"
      autoFocus

    />
  )
}

export default EmailTextField