import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpense = () => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setFetching(true);
      try {
        const expenses = await fetchExpenses();   
        expensesCtx.setExpenses(expenses);     
      } catch (error) {
        setError('Could not fetch the expenses')
      }
      setFetching(false);
    }

    getExpenses();
  }, []);


  if (error && !fetching) {
    return (
      <ErrorOverlay message={error}/>
    )
  }

  if (fetching) {
    <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="There are not expenses in the last 7 days"/>
  );
}

export default RecentExpense;