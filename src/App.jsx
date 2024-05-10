import {Button, Container} from "react-bootstrap";
import {Stack} from "react-bootstrap";
import "./index.css"
import BudgetCard from "./components/BudgetCard";
import AddBudget from "./components/AddBudget";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpense from "./components/AddExpense";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App(){
    const [showAddBudgetModal, setShowAddBudgetModel] = useState(false)
    const [showExpenseBudgetModal, setShowExpenseBudgetModel] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

    function openAddExpense(budgetId){
        setShowExpenseBudgetModel(true)
        setAddExpenseModalBudgetId(budgetId)
    }

    const {budgets, getBudgetExpenses} = useBudgets()
    return (
        <>
        <Container>
            <Stack direction="horizontal" gap="2" className="mb-4">
                <h1 className="me-auto">Budget Tracker</h1>
                <Button onClick={()=>setShowAddBudgetModel(true)} variant="primary">Add Budget</Button>
                <Button onClick={openAddExpense} variant="outline-primary">Add Expense</Button>
            </Stack>
            <div className="display-cards">
                {budgets.map(budget=>{
                    const amount = getBudgetExpenses(budget.id).reduce(
                        (total, expense) => total + expense.amount, 0
                    )
                    return <BudgetCard 
                    key = {budget.id}
                    title = {budget.title} 
                    amount = {amount} 
                    maxAmount = {budget.maxAmount}

                    openAddExpense = {()=> openAddExpense(budget.id)}
                    >
                    </BudgetCard>
                })}
            <UncategorizedBudgetCard
            key = {UNCATEGORIZED_BUDGET_ID}
            title = {UNCATEGORIZED_BUDGET_ID}
            openAddExpense = {()=> openAddExpense(UNCATEGORIZED_BUDGET_ID)}
            >
            </UncategorizedBudgetCard>
            
            <TotalBudgetCard
            title = "Total budget"
            >
            </TotalBudgetCard>
            
            </div>
            
        </Container>
        <AddBudget show={showAddBudgetModal} handleClose={()=>{
            setShowAddBudgetModel(false)
        }}></AddBudget>
        <AddExpense show={showExpenseBudgetModal} 
        handleClose={()=>{setShowExpenseBudgetModel(false)}}
        defaultBudgetId={addExpenseModalBudgetId}
        >
        </AddExpense>
        </>
        
    );
}

export default App