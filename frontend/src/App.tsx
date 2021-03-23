import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppToolbar from './components/AppToolbar';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './layouts/Dashboard';
import NotLoggedButtons from "./components/NotLoggedButtons"
import UserAvatar from "./components/UserAvatar"
import Transactions from "./pages/Transactions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const queryClient = new QueryClient()

export default function App() {
  const classes = useStyles();

  const history = useHistory()
  history.push('/login')

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.root}>
        <CssBaseline />
        <AppToolbar>
          <Switch>
            <Route path={['/login', '/register']}>
              <NotLoggedButtons />
            </Route>
            <Route path="/dashboard">
              <UserAvatar></UserAvatar>
            </Route>
          </Switch>
        </AppToolbar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/dashboard">
              <Dashboard>
                <Switch>
                  <Route path="/dashboard/account">
                    ciao
                  </Route>
                  <Route path="/dashboard/transactions">
                    <Transactions />
                  </Route>
                </Switch>
              </Dashboard>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
          </Switch>
        </main>
      </div>
    </QueryClientProvider>

  );
}