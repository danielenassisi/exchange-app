import React, { FC } from 'react'
import { GridColDef, DataGrid, GridLocaleText } from "@material-ui/data-grid"
import { useQuery } from 'react-query'
import { authApi } from "../utils/api"
import { Transaction } from "../models/Transaction"
import { Paper } from '@material-ui/core'

const columns: GridColDef[] = [
  {
    field: 'date',
    type: 'dateTime',
    headerName: 'Data',
    flex: 1
  },
  {
    field: 'value',
    type: 'number',
    headerName: 'Valore',
    flex: 1
  },
  {
    field: 'symbol',
    headerName: 'Valuta',
    flex: 1
  },
  {
    field: 'operation',
    headerName: 'Tipo operazione',
    flex: 1,
    valueFormatter: ({ value }) => {
      if (value == "DEPOSIT") {
        return "DEPOSITO"
      }
      if (value == "WITHDRAW") {
        return "PRELIEVO"
      }
      if (value == "BUY_DEPOSIT") {
        return "DEPOSITO DA ACQUISTO"
      }
      if (value == "BUY_WITHDRAW") {
        return "PRELIEVO DA ACQUISTO"
      }
    }
  }
]

const locales: Partial<GridLocaleText> = {
  noRowsLabel: 'Nessuna transazione effettuata',
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostra colonne',
  columnMenuFilter: 'Filtra',
  columnMenuHideColumn: 'Nascondi',
  columnMenuUnsort: 'Disabilita ordinamento',
  columnMenuSortAsc: 'Ordina in modo crescente',
  columnMenuSortDesc: 'Ordina in modo descrescente',
  columnsPanelTextFieldLabel: 'Trova colonna',
  columnsPanelTextFieldPlaceholder: 'Titolo colonna',
  columnsPanelDragIconLabel: 'Riordina colonna',
  columnsPanelShowAllButton: 'Mostra tutto',
  columnsPanelHideAllButton: 'Nascondi tutto',

  // Filter panel text
  filterPanelAddFilter: 'Aggiungi filtro',
  filterPanelDeleteIconLabel: 'Cancella',
  filterPanelOperators: 'Operatori',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'O',
  filterPanelColumns: 'Colonne',
  filterPanelInputLabel: 'Valore',
  filterPanelInputPlaceholder: 'Valore filtro',

  filterOperatorContains: 'contiene',
  filterOperatorEquals: 'è uguale',
  filterOperatorStartsWith: 'comincia con',
  filterOperatorEndsWith: 'finisce con',
  filterOperatorIs: 'è',
  filterOperatorNot: 'non è',
  filterOperatorAfter: 'è dopo',
  filterOperatorOnOrAfter: 'è esattamente o dopo',
  filterOperatorBefore: 'è prima',
  filterOperatorOnOrBefore: 'è esattamente o prima',

  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} righe selezionate`
      : `${count.toLocaleString()} riga selezionata`,
}

const Transactions: FC = () => {

  const { isLoading, data, error } = useQuery('transactions', () => authApi().get<Transaction[]>('/transactions'))

  return (
    <Paper style={{height: '90vh', width: '100%'}}>
      {isLoading ? "Caricamento..." : null}
      {error ? "Errore" : null}
      {(!isLoading && !error) ? <DataGrid autoPageSize columns={columns} rows={data?.data.map(tr => ({
        ...tr,
        date: new Date(tr.date)
      })) || []} localeText={locales}></DataGrid> : null}
    </Paper>
  )
}


export default Transactions