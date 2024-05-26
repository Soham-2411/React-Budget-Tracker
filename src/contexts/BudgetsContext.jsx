import React, {useContext, useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.jsx";
import {v4 as uuidV4} from 'uuid';

const BudgetsContext = React.createContext()
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext);
}


export const BudgetsContextProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) { 
        return expenses.filter(expenses => expenses.budgetId == budgetId)
    }
    function addExpense({description, amount, budgetId}) { 
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })
    }
    function addBudget({title, maxAmount}) { 
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.title == title)){
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidV4(), title, maxAmount}]
        })
    }
    function deleteBudget({idToDelete}) { 
        console.log(idToDelete)
        console.log(expenses)
        setExpenses(prevExpenses => {
            return prevExpenses.map((expense)=>{
                console.log(expense.budgetId)
                console.log(idToDelete)
                if(expense.budgetId !== idToDelete.id){
                    return expense
                } else{
                    return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
                }
            })
        })
        console.log(expenses)
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget !== idToDelete)
        })
    }
    function deleteExpense({idToDelete}) { 
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== idToDelete )
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}
        >{children}</BudgetsContext.Provider>
    )
}