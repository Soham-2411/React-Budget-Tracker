import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import { Button, Stack, Modal } from 'react-bootstrap'
import { currencyFormatter } from '../utils'

export default function ViewExpenses({ budgetId, handleClose }) {

    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID == budgetId ?
        { title: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id == budgetId)
    if (budget == null)
        return
    const expenses = getBudgetExpenses(budget.id)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Stack direction='horizontal' gap='2'>
                    <div>Expenses - {budget?.title}</div>
                    {budget?.id !== UNCATEGORIZED_BUDGET_ID && (
                        <Button
                            onClick={() => {
                                deleteBudget({idToDelete: budget})
                                handleClose()
                            }}
                            variant="outline-danger">Delete</Button>)}
                </Stack>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='vertical' gap='3'>
                    {expenses.map(expense => {
                        return <Stack className="justify-content-between align-items-center"
                            direction='horizontal'
                            key={expense.id}
                            gap='2'>
                            <div>{expense.description}</div>
                            <Stack direction='horizontal' gap="2">
                                <div>{currencyFormatter.format(expense.amount)}</div>
                                <Button
                                    onClick={() => deleteExpense({ idToDelete: expense.id })}
                                    variant="outline-danger">&times;</Button>
                            </Stack>
                        </Stack>
                    })}
                </Stack>

            </Modal.Body>
        </Modal>
    )
}
