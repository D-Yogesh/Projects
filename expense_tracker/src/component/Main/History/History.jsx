import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import {Delete, MoneyOff} from '@material-ui/icons'

import useStyles from './styles'

const History = () => {
    const classes = useStyles()
    const transactions = [
        {id: 1, type: 'Income', category: 'Salary', amount: 50, date: '23 May 2024'},
        {id: 2, type: 'Expense', category: 'Pets', amount: 50, date: '24 May 2024'},
        {id: 3, type: 'Income', category: 'Business', amount: 150, date: '25 May 2024'}
    ]
    return (
        <List className={classes.list}>
            {transactions.map(transaction => (
                <ListItem key={transaction.id}>
                    <ListItemAvatar>
                        <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                            <MoneyOff/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                    <ListItemSecondaryAction>
                        <IconButton>
                            <Delete/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    )
}

export default History;