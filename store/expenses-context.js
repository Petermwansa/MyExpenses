import { Children, createContext, useReducer } from "react";



const DUMMY_EXPENSES = [
    {
      id: 'e1',
      description: 'A pair of pants',
      amount: 34.33,
      date: new Date('2025-05-10')
    },
    {
      id: 'e2',
      description: 'A pair of shorts',
      amount: 33.33,
      date: new Date('2025-12-03')
    },
    {
      id: 'e3',
      description: 'A Ferrari',
      amount: 331222.33,
      date: new Date('2022-07-04')
    },
    {
      id: 'e4',
      description: 'A pen',
      amount: 3.33,
      date: new Date('2023-02-12')
    },
    {
      id: 'e5',
      description: 'A Ferrari',
      amount: 32.33,
      date: new Date('2021-10-10')
    },
    {
      id: 'e6',
      description: 'A pair of pants',
      amount: 34.33,
      date: new Date('2025-01-03')
    },
    {
      id: 'e7',
      description: 'A pair of shorts',
      amount: 33.33,
      date: new Date('2024-07-03')
    },
    {
      id: 'e8',
      description: 'A Ferrari',
      amount: 331222.33,
      date: new Date('2022-07-04')
    },
    {
      id: 'e9',
      description: 'A pen',
      amount: 3.33,
      date: new Date('2023-02-12')
    },
    {
      id: 'e10',
      description: 'A Ferrari',
      amount: 32.33,
      date: new Date('2021-10-10')
    },
  ];
  
  

// we create the expenses context with the data model of the arrays and functions it will have 
export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});


const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':    
            // here in the line below we are generating a unique id number 
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id}, ...state];

        case 'UPDATE':    
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [ ...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':    
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}


const ExpensesContextProvider = ({children}) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData) => {
        dispatch({type: 'ADD', payload: expenseData });
    }

    const deleteExpense = (id) => {
        dispatch({type: 'DELETE', payload: id });
    } 

    const updateExpense = (id, expenseData) => {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    } 


    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
    }



    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;