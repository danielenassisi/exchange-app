import { Avatar, Button, IconButton, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PasswordTextField from './PasswordTextField'
import EmailTextField from './EmailTextField'
import ConfirmPasswordTextField from './ConfirmPasswordTextField'
import IbanTextField from './IbanTextField'
import { useEmailValidation, useIbanValidation, usePasswordValidation, useValidation } from '../hooks/useValidation'
import { required } from '../utils/validators'
import { useMutation } from 'react-query'
import { Alert } from "@material-ui/lab"
import { RegisterViewModel } from '../models/RegisterViewModel'
import { api } from '../utils/api'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default function RegisterForm() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [iban, setIban] = useState('')
  const [open, setOpen] = useState(false)

  const [nameChanged, setNameChanged, nameValidator] = useValidation(required)
  const [surnameChanged, setSurnameChanged, surnameValidator] = useValidation(required)
  const emailValidation = useEmailValidation()
  const passwordValidation = usePasswordValidation()
  const ibanValidation = useIbanValidation()
  const confirmPasswordValidation = usePasswordValidation()

  const history = useHistory()

  const formError = useMemo(() => !(
    nameValidator(name) &&
    surnameValidator(surname) &&
    emailValidation[2](email) &&
    passwordValidation[2](password) &&
    password == confirmPassword &&
    ibanValidation[2](iban)
  ), [name, surname, email, password, confirmPassword, iban])

  const registerUserMutation = useMutation((vm: RegisterViewModel) => api.post('/users/signup', vm), {
    onSuccess: () => history.push('/login'),
    onError: () => setOpen(true)
  })

  const onRegisterSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const vm: RegisterViewModel = {
      email,
      name,
      surname,
      password,
      confirmPassword,
      iban
    }

    registerUserMutation.mutate(vm)

  }

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registrazione
      </Typography>
      <form className={classes.form} noValidate onSubmit={onRegisterSubmit}>
        <TextField
          error={!nameValidator(name) && nameChanged}
          value={name}
          onChange={e => {
            setNameChanged(true)
            setName(e.target.value)
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          error={!surnameValidator(surname) && surnameChanged}
          value={surname}
          onChange={e => {
            setSurnameChanged(true)
            setSurname(e.target.value)
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="surname"
          label="Cognome"
          name="surname"
          autoComplete="surname"

        />
        <EmailTextField
          email={email}
          onEmailChange={setEmail}
          validation={emailValidation}
        />
        <PasswordTextField
          password={password}
          onPasswordChange={setPassword}
          validation={passwordValidation}
        />
        <ConfirmPasswordTextField
          password={password}
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={setConfirmPassword}
          validation={confirmPasswordValidation}
        />
        <IbanTextField
          iban={iban}
          onIbanChange={setIban}
          validation={ibanValidation}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={formError}
          className={classes.submit}
        >
          {registerUserMutation.isLoading ? "In corso..." : "Registrati"}
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Errore, riprovare più tardi
          </Alert>
        </Snackbar>
      </form>
    </div>
  )
}
