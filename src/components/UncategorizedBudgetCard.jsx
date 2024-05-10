import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'

function UncategorizedBudgetCard(props) {

  const {getBudgetExpenses} = useBudgets()

  const uncategorizedExpenses = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((
    total, expense) => total+expense.amount, 0)

    if(uncategorizedExpenses === 0){
      return null
    }

  return (
    <BudgetCard amount = {uncategorizedExpenses} {...props} gray title = "Uncategorized">

    </BudgetCard>
  )
}

export default UncategorizedBudgetCard
