import React, { FC } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import { Link, useRouteMatch } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      paddingLeft: drawerWidth,
      padding: theme.spacing(3),
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }),
);

const Dashboard: FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const {path, url} = useRouteMatch()

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Il mio profilo', 'Le mie transazioni',].map((text, index) => (
              <ListItem key={text} button component={Link} to={`${index == 0 ? 'account' : 'transactions'}`}>
                <ListItemIcon>{index % 2 === 0 ? <AccountCircleIcon /> : <AccountBalanceIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {props.children}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Dashboard