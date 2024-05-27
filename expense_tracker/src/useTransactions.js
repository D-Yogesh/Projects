import { useContext } from "react"
import { ExpenseTrackerContext } from "./context/context"
import { expenseCategories, incomeCategories } from "./constants/categories";

const useTransactions = (title) => {
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionsOfType = transactions.filter(t => t.type === title.toLowerCase())
    const total = transactionsOfType.reduce((acc, currVal) => acc += currVal.amount, 0)
    const selectedCategories = title.toLowerCase() === 'income' ? incomeCategories : expenseCategories

    // console.log({total, selectedCategories, transactionsOfType, transactions})

    transactionsOfType.forEach(t => {
        const category = selectedCategories.find(c => c.type === t.category)
        if(category) category.amount += t.amount
    });
    const filteredCategories = selectedCategories.filter(c => c.amount > 0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map(c => c.amount),
            backgroundColor: filteredCategories.map(c => c.color)
        }],
        labels: filteredCategories.map(c => c.type)
    }
    console.log(chartData)
    return {total, chartData}
}

export default useTransactions;