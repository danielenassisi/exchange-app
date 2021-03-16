import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import MoneyImg from "../assets/money.jpg"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${MoneyImg})`,
    backgroundSize: 'cover',
    height: '100%',
    width: '100%'
  }
}))

export default function Home() {
  const classes = useStyles()

  return (
    <Box className={classes.root} display="flex" flex="1" flexDirection="row" alignContent="center" justifyItems="center" alignItems="center">
      <Paper>
        <Box margin={2} display="flex" flex="1" flexDirection="row" alignContent="center" justifyItems="center" alignItems="center">
          <Typography color="textPrimary" variant="h2" component="h2">Un servizio per scambiare valute</Typography>
          <Button color="primary" variant="contained" size="large">accedi ora</Button>
        </Box>
      </Paper>
    </Box>
  )
}
