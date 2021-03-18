import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react'
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { Predicate } from "../utils/validators"

interface ConfirmPasswordTextFieldProps {
  password: string,
  confirmPassword: string,
  onConfirmPasswordChange: React.Dispatch<React.SetStateAction<string>>,
  validation: [boolean, React.Dispatch<React.SetStateAction<boolean>>, Predicate<string>]
}


const ConfirmPasswordTextField: FC<ConfirmPasswordTextFieldProps> = (props) => {

  const [showPassword, setShowPassword] = useState(false)
  const [changed, setChanged, passwordValidator] = props.validation

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onConfirmPasswordChange(event.target.value)
    setChanged(true)
  }
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <TextField
      error={(!passwordValidator(props.confirmPassword) || props.password != props.confirmPassword) && changed}
      value={props.confirmPassword}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="confirmPassword"
      label="Conferma password"
      type={showPassword ? 'text' : 'password'}
      id="confirmPassword"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </ InputAdornment>
        )
      }}
    />
  )
}

export default ConfirmPasswordTextField