import { Avatar, Button, Grid, Link, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import { Link as RouterLink, useHistory } from "react-router-dom"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PasswordTextField from './PasswordTextField'
import EmailTextField from './EmailTextField'
import { useEmailValidation, usePasswordValidation } from '../hooks/useValidation'
import { useMutation } from 'react-query'
import { api } from '../utils/api'
import { LoginViewModel } from "../models/LoginViewModel"
import { LoginDto } from "../models/LoginDto"
import { AxiosError } from 'axios'
import { Alert } from '@material-ui/lab'

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


export default function LoginForm() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailValidation = useEmailValidation()
  const passwordValidation = usePasswordValidation()
  const history = useHistory()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorText, setErrorText] = useState('')

  const loginMutation = useMutation((vm: LoginViewModel) => api.post<LoginDto>('/users/login', vm), {
    onSuccess: (res) => {

      localStorage.setItem('token', res.data.token)
      history.push('/dashboard')
    },
    onError: (err: AxiosError) => {
      if (err?.code && parseInt(err?.code) % 100 == 4) {
        setErrorText('Errore, credenziali non corrette')
      } else {
        setErrorText('Errore, riprovare più tardi')
      }
      setSnackbarOpen(true)
    }
  })

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const formError = useMemo(() => !(emailValidation[2](email) && passwordValidation[2](password)), [email, password])

  const onLoginSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()

    const vm: LoginViewModel = { email, password }
    loginMutation.mutate(vm)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate onSubmit={onLoginSubmit}>
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
        <Button
          type="submit"
          disabled={formError}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {loginMutation.isLoading ? 'In corso...' : 'Login'}
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Non hai un account? Registrati"}
            </Link>
          </Grid>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorText}
          </Alert>
        </Snackbar>
      </form>
    </div>
  )
}
