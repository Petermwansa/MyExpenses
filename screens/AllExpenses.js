import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {

   const ExpensesCtx = useContext(ExpensesContext);

  return(
    <ExpensesOutput expenses={ExpensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses"/>
  )
}

export default AllExpenses