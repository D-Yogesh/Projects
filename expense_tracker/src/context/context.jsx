import React,{ createContext, useReducer } from "react"
import contextReducer from "./contextReducer"

let initialState  = [
    {id: 1, type: 'income', category: 'Salary', amount: 50, date: '23 May 2024'},
    {id: 2, type: 'expense', category: 'Pets', amount: 50, date: '24 May 2024'},
    {id: 3, type: 'Income', category: 'Business', amount: 150, date: '25 May 2024'}
]

export const ExpenseTrackerContext = createContext(initialState)

const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const deleteTransaction = id => dispatch({type: 'DELETE_TRANSACTION', payload: id})

    const addTransaction = transaction => dispatch({type: 'ADD_TRANSACTION', payload: transaction})
    return (
        <ExpenseTrackerContext.Provider value={{deleteTransaction, addTransaction, transactions}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}

export default Provider