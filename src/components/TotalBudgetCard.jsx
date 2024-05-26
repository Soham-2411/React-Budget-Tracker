import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets } from '../contexts/BudgetsContext'

export default function TotalBudgetCard(props) {
  
    const {expenses,  budgets} = useBudgets()

    const totalExpense = expenses.reduce(
        (total, expense) => total+expense.amount, 0
    )

    const totalBudget = budgets.reduce(
        (total, budget) => total + budget.maxAmount, 0
    )
    if (totalBudget === 0){
        return null
    }
    return (
    <BudgetCard maxAmount = {totalBudget} amount = {totalExpense} 
    hide
    {...props}>

    </BudgetCard>
  )
}
