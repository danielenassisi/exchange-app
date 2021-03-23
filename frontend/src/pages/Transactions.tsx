import React, { FC } from 'react'
import { GridColDef, DataGrid } from "@material-ui/data-grid"
import { useQuery } from 'react-query'
import { authApi } from "../utils/api"
import { Transaction } from "../models/Transaction"

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Data',
  },
  {
    field: 'value',
    headerName: 'Valore'
  },
  {
    field: 'symbol',
    headerName: 'Valuta'
  },
  {
    field: 'operation',
    headerName: 'Tipo operazione'
  }
]


const Transactions: FC = () => {

  const { isLoading, data, error } = useQuery('transactions', () => authApi().get<Transaction[]>('/transactions'))

  return (
    <div style={{height: '100vh', width: '100%'}}>
      {isLoading ? "Caricamento..." : null}
      {error ? "Errore" : null}
      {(!isLoading && !error) ? <DataGrid columns={columns} rows={data?.data || []}></DataGrid> : null}
    </div>
  )
}


export default Transactions