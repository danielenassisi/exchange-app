import { createStyles, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, TextField, Theme } from '@material-ui/core';
import clsx from "clsx"
import React, { FC, useState } from 'react'
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { required, minCharactersFactory, hasLowercaseCharacters, hasUppercaseCharacters, hasSpecialCharacters, hasNumbers, Predicate } from "../utils/validators"
import { useValidation } from '../hooks/useValidation';

interface PasswordTextFieldProps {
  password: string,
  onPasswordChange: React.Dispatch<React.SetStateAction<string>>,
  validation: [boolean, React.Dispatch<React.SetStateAction<boolean>>, Predicate<string>]
}

const PasswordTextField: FC<PasswordTextFieldProps> = (props) => {

  const [showPassword, setShowPassword] = useState(false)
  const [changed, setChanged, passwordValidator] = props.validation

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onPasswordChange(event.target.value)
    setChanged(true)
  }
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <TextField
      error={!passwordValidator(props.password) && changed}
      value={props.password}
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      id="password"
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
      autoComplete="current-password"
    />
  )
}

export default PasswordTextField