import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppToolbar() {

  const classes = useStyles()

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Exchange app
          </Typography>
        <ButtonGroup variant="text" color="inherit">
          <Button component={Link} to="/login">Login</Button>
          <Button component={Link} to="/register">Registrati</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  )
}
