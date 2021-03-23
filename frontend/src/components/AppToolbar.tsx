import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from "../hooks/useMeQuery"

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const AppToolbar: FC = (props) => {

  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Exchange app
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  )
}
export default AppToolbar