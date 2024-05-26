import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"

import useStyles from './styles'
import { useContext, useState } from "react"
import { ExpenseTrackerContext } from "../../../context/context"
import {v4 as uuid} from 'uuid'

const initialState = {
    type: 'income',
    category: '',
    amount:'',
    date: new Date()
}

const Form = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const {addTransaction} = useContext(ExpenseTrackerContext)

    const createTransaction = () => {
        const transaction = {
            ...formData,
            id: uuid(),
            amount: Number(formData.amount)
        }
        addTransaction(transaction)
        setFormData(initialState)
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <Typography align="center" variant="subtitle2" gutterBottom>
                        ...Speechly text
                    </Typography>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <MenuItem value="business">
                            Business
                        </MenuItem>
                        <MenuItem value="Salary">
                            Salary
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField label="Amount" type="Number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})}/>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField label="Date" type="date" fullWidth value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}/>
                </FormControl>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}
export default Form