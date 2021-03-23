import React, { FC } from 'react'
import { ButtonGroup, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const NotLoggedButtons: FC = (props) => {
  return (
    <ButtonGroup variant="text" color="inherit">
      <Button component={Link} to="/login">Login</Button>
      <Button component={Link} to="/register">Registrati</Button>
    </ButtonGroup>
  )
}

export default NotLoggedButtons