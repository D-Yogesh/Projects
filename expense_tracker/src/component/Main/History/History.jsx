import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import {Delete, MoneyOff} from '@material-ui/icons'

import useStyles from './styles'
import { useContext } from "react";
import { ExpenseTrackerContext } from "../../../context/context";

const History = () => {
    const classes = useStyles()
    const {deleteTransaction, transactions} = useContext(ExpenseTrackerContext)
    console.log(deleteTransaction, transactions)

    return (
        <List className={classes.list}>
            {transactions.map(transaction => (
                <ListItem key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar className={transaction.type === 'income' ? classes.avatarIncome : classes.avatarExpense}>
                            <MoneyOff/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => deleteTransaction(transaction.id)}>
                            <Delete/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}

export default History;