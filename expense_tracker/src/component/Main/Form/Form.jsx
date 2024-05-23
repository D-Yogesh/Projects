import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"

import useStyles from './styles'

const Form = () => {
    const classes = useStyles()
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
                    <Select fullWidth>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select >
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
                    <TextField label="Amount" type="Number" />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField label="Date" type="date" fullWidth/>
                </FormControl>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
        </Grid>
    )
}
export default Form