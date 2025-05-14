import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {

    // when you recieve any input it will always be a string even if the input accepts a number 
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        }
    });

    const amountChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true},
            }
        });
    }

    // the plus on the amountg converts it into a number 
    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        // here we validate the form 
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid},
                    date: { value: curInputs.date.value, isValid: dateIsValid},
                    description: { value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }


        onSubmit(expenseData);

    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
        <Text style={styles.text}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                style={styles.rowInput}
                label="Amount" 
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: amountChangeHandler.bind(this, 'amount'),
                value: inputs.amount.value,
            }}/>
            <Input 
                tyle={styles.rowInput}
                label="Date"  
                invalid={!inputs.date.isValid}
                textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: amountChangeHandler.bind(this, 'date'),
                value: inputs.date.value,
            }}/>
        </View>
        <Input 
            label="Description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                onChangeText: amountChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            // autoCapitalize: 'none', 
            // autocorrect: false 
        }}/>
        {formIsInvalid && <Text style={styles.error}>Invalid Input! Please check the entered data</Text>}
        <View style={styles.buttons}>
            <Button
                style={styles.button} 
                mode='flat' 
                onPress={onCancel}
            >
                Cancel
            </Button>
            <Button 
            style={styles.button} 
            onPress={submitHandler}
            >
            {submitButtonLabel}
            </Button>
        </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    text: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex:  1,
    },
      buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  error: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 12,
  }
})