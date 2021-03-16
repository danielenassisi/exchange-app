import { createStyles, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, TextField, Theme } from '@material-ui/core';
import clsx from "clsx"
import React, { FC, useState } from 'react'
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { required, minCharactersFactory, hasLowercaseCharacters, hasUppercaseCharacters, hasSpecialCharacters, hasNumbers } from "../utils/validators"



const PasswordTextField: FC<{ password: string, onPasswordChange: React.Dispatch<React.SetStateAction<string>> }> = (props) => {

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => props.onPasswordChange(event.target.value)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  const passwordValidator = (pw: string) => !(
    required(pw) &&
    minCharactersFactory(8)(pw) &&
    hasLowercaseCharacters(pw) &&
    hasUppercaseCharacters(pw) &&
    hasSpecialCharacters(pw) &&
    hasNumbers(pw)
  )

  return (
    <TextField
      error={passwordValidator(props.password)}
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