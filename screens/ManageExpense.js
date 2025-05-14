import { View, Text } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { StyleSheet } from 'react-native';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // the question mark shows that we are taaping in the expense and seeing if the params are undefined and then not do any action 
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  );

  // we use the uselayout hook to prevent it from flickering 
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpeseHandler = async () => {
    setLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete. Please try again");
      setLoading(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }


  const confirmHandler = async (expenseData) => {
    setLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }  
      navigation.goBack();    
    } catch (error) {
      setError("Could not save the data. Please try again later");
      setLoading(false)
    }
  }


  if (error && !laoding) {
    return (
      <ErrorOverlay message={error} />
    )
  }

  if (laoding) {
    return <LoadingOverlay />
  }



  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : "Add" } 
        onCancel={cancelHandler}  
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon='trash' 
            color={GlobalStyles.colors.error500} 
            size={36} 
            onPress={deleteExpeseHandler}
          />
        </View>
      )}    
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800

  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})