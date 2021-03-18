import { TextField } from '@material-ui/core'
import React, { FC } from 'react'
import { Predicate } from "../utils/validators"

interface IbanTextFieldProps {
  iban: string,
  onIbanChange: React.Dispatch<React.SetStateAction<string>>,
  validation: [boolean, React.Dispatch<React.SetStateAction<boolean>>, Predicate<string>]
}

const IbanTextField: FC<IbanTextFieldProps> = ({ iban, onIbanChange, validation }) => {
  const [changed, setChanged, ibanValidator] = validation


  return (
    <TextField
      error={!ibanValidator(iban) && changed}
      value={iban}
      onChange={e => {
        setChanged(true)
        onIbanChange(e.target.value)
      }}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="iban"
      label="Codice Iban"
      name="iban"
      autoComplete="iban"
    />
  )
}

export default IbanTextField