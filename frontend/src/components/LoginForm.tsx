import { Avatar, Button, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link as RouterLink } from "react-router-dom"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import PasswordTextField from './PasswordTextField'

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

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus

        />
        <PasswordTextField
          password={password}
          onPasswordChange={setPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
        <Grid container>
          {/* <Grid item xs>
            <Link href="#" variant="body2">
              Password dimenticata?
            </Link>
          </Grid> */}
          <Grid item>
            <Link component={RouterLink} to="/register"variant="body2">
              {"Non hai un account? Registrati"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
