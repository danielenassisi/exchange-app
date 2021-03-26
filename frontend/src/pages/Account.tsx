import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import UserAvatar from '../components/UserAvatar'
import EuroIcon from "@material-ui/icons/Euro"
import UsdIcon from "@material-ui/icons/AttachMoney"
import { useMeQuery } from '../hooks/useMeQuery'
import { useMutation } from 'react-query'
import { useValidation } from '../hooks/useValidation'
import { DepositViewModel } from '../models/DepositViewModel'
import { WithdrawViewModel } from '../models/WithdrawViewModel'
import { authApi } from '../utils/api'
import { AxiosError } from 'axios'
import { Alert } from '@material-ui/lab'
import { BuyViewModel } from '../models/BuyViewModel'

const Account: FC = () => {
  const { isLoading, data, error, refetch: refetchMe } = useMeQuery()
  const [openDeposit, setOpenDeposit] = useState(false)
  const [openWithdraw, setOpenWithdraw] = useState(false)
  const [openBuy, setOpenBuy] = useState(false)
  const [value, setValue] = useState(0)
  const [currency, setCurrency] = useState<"USD" | "EUR">("EUR")

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [depositChanged, setDepositChanged, depositValidator] = useValidation<number>(v => v > 0)
  const [withdrawChanged, setWithdrawChanged, withdrawValidator] = useValidation<number>(v => v > 0)
  const [buyChanged, setBuyChanged, buyValidator] = useValidation<number>(v => v > 0)

  const depositMutation = useMutation((vm: DepositViewModel) => authApi().post('/transactions/deposit', vm), {
    onSuccess: (vm) => {
      refetchMe()
    },
    onError: (err: AxiosError) => {
      if (err?.code && parseInt(err?.code) % 100 == 4) {
        setErrorText('Errore, deposito non corretto')
      } else {
        setErrorText('Errore, riprovare più tardi')
      }
      setSnackbarOpen(true)
    }
  })
  const withdrawMutation = useMutation((vm: WithdrawViewModel) => authApi().post('/transactions/withdraw', vm), {
    onSuccess: (vm) => {
      refetchMe()
    },
    onError: (err: AxiosError) => {
      if (err?.code && parseInt(err?.code) % 100 == 4) {
        setErrorText('Errore, prelievo non possibile')
      } else {
        setErrorText('Errore, riprovare più tardi')
      }
      setSnackbarOpen(true)
    }
  })
  const buyMutation = useMutation((vm: BuyViewModel) => authApi().post('/transactions/buy', vm), {
    onSuccess: (vm) => {
      refetchMe()
    },
    onError: (err: AxiosError) => {
      if (err?.code && parseInt(err?.code) % 100 == 4) {
        setErrorText('Errore, acquisto non possibile')
      } else {
        setErrorText('Errore, riprovare più tardi')
      }
      setSnackbarOpen(true)
    }
  })

  const handleClose = (type?: "DEPOSIT" | "WITHDRAW" | "BUY") => {

    if (type && type == "DEPOSIT") {
      depositMutation.mutate({ value, symbol: currency })
    }
    if (type && type == "WITHDRAW") {
      withdrawMutation.mutate({ value, symbol: currency })
    }
    if (type && type == "BUY") {
      buyMutation.mutate({ value, symbol: currency })
    }
    setOpenDeposit(false)
    setOpenWithdraw(false)
    setOpenBuy(false)
  }

  return (
    <React.Fragment>
      { isLoading ? "Caricamento..." : null}
      { error ? "Errore" : null}
      {
        data ?
          (
            <Grid item container component={Paper} xs={12} direction="column">
              <Box alignSelf="center">
                <Avatar src="../assets/money.jpg" style={{ width: '10vw', height: '10vw' }} />
              </Box>
              <Box p={3}>
                <Typography variant="h3" color="primary" align="center">Ciao {data.data.name} {data.data.surname}</Typography>
              </Box>
              <Box p={2}>
                <Typography variant="h6" color="textSecondary" align="center">{data.data.email}</Typography>
              </Box>
              <Box p={2} paddingBottom={4}>
                <Typography variant="h6" color="textSecondary" align="center">Iban: {data.data.iban}</Typography>
              </Box>
              <Grid item container justify="space-around">
                <Button color="primary" variant="contained" size="large" onClick={() => setOpenDeposit(true)}>Deposita</Button>
                <Button disabled={(!data?.data.eurCurrentAccount && !data?.data.usdCurrentAccount)} color="primary" variant="contained" size="large" onClick={() => setOpenWithdraw(true)}>Preleva</Button>
                <Button disabled={(!data?.data.eurCurrentAccount && !data?.data.usdCurrentAccount)} color="primary" variant="contained" size="large" onClick={() => setOpenBuy(true)}>Converti denaro</Button>
              </Grid>
              <Box p={3}></Box>
              <Divider></Divider>
              <Box p={2}>
                <Typography variant="h3" color="primary" align="center">I tuoi saldi: </Typography>
              </Box>
              <Box p={2}>
                <List>
                  {data.data.eurCurrentAccount && <ListItem alignItems="center" divider>
                    <ListItemIcon>
                      <EuroIcon />
                    </ListItemIcon>
                    <ListItemText secondaryTypographyProps={{ variant: "h3" }} secondary={data.data.eurCurrentAccount?.value.toFixed(2)} />
                  </ListItem>
                  }
                  {data.data.usdCurrentAccount && <ListItem alignItems="center" divider>
                    <ListItemIcon>
                      <UsdIcon />
                    </ListItemIcon>
                    <ListItemText secondaryTypographyProps={{ variant: "h3" }} secondary={data.data.usdCurrentAccount?.value.toFixed(2)} />
                  </ListItem>}
                </List>
              </Box>

            </Grid>
          )
          : null
      }
      <Dialog open={openDeposit} onClose={(e) => handleClose()}>
        <DialogTitle id="form-dialog-title">Deposita denaro</DialogTitle>
        <DialogContent >
          <TextField
            select
            label="Valuta"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as ("EUR" | "USD"))}
          >
            <MenuItem value={"EUR"}>€ (EUR)</MenuItem>
            <MenuItem value={"USD"}>$ (USD)</MenuItem>
          </TextField>
          <TextField
            error={depositChanged && !depositValidator(value)}
            id="deposit"
            value={value}
            onChange={(e) => {
              setValue(parseFloat(e.target.value))
              setDepositChanged(true)
            }}
            label="Denaro da depositare"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClose()} color="primary">
            Annulla
          </Button>
          <Button onClick={e => handleClose("DEPOSIT")} color="primary">
            Deposita
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openWithdraw} onClose={(e) => handleClose()}>
        <DialogTitle id="form-dialog-title">Preleva denaro</DialogTitle>
        <DialogContent >
          <TextField
            select
            label="Valuta"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as ("EUR" | "USD"))}
          >
            {data?.data.eurCurrentAccount && <MenuItem value={"EUR"}>€ (EUR)</MenuItem>}
            {data?.data.usdCurrentAccount && <MenuItem value={"USD"}>$ (USD)</MenuItem>}

          </TextField>
          <TextField
            error={
              withdrawChanged && (
                !withdrawValidator(value) ||
                (!data?.data.eurCurrentAccount && !data?.data.usdCurrentAccount) ||
                // @ts-ignore
                value > ((currency && currency == "EUR") ? data?.data.eurCurrentAccount?.value : data?.data.usdCurrentAccount?.value)
              )
            }
            id="withdraw"
            value={value}
            onChange={(e) => {
              setValue(parseFloat(e.target.value))
              setWithdrawChanged(true)
            }}
            label="Denaro da prelevare"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClose()} color="primary">
            Annulla
          </Button>
          <Button onClick={e => handleClose("WITHDRAW")} color="primary">
            Preleva
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openBuy} onClose={(e) => handleClose()}>
        <DialogTitle id="form-dialog-title">Converti denaro</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Valuta"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as ("EUR" | "USD"))}
          >
            {data?.data.eurCurrentAccount && <MenuItem value={"EUR"}>€ (EUR)</MenuItem>}
            {data?.data.usdCurrentAccount && <MenuItem value={"USD"}>$ (USD)</MenuItem>}

          </TextField>
          <TextField
            error={
              buyChanged && (
                !buyValidator(value) ||
                (!data?.data.eurCurrentAccount && !data?.data.usdCurrentAccount) ||
                // @ts-ignore
                value > ((currency && currency == "EUR") ? data?.data.eurCurrentAccount?.value : data?.data.usdCurrentAccount?.value)
              )
            }
            id="buy"
            value={value}
            onChange={(e) => {
              setValue(parseFloat(e.target.value))
              setBuyChanged(true)
            }}
            label="Denaro da convertire"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClose()} color="primary">
            Annulla
          </Button>
          <Button onClick={e => handleClose("BUY")} color="primary">
            Converti
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error">
          {errorText}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}


export default Account