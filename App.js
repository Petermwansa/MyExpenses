import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpenses from './screens/AllExpenses';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='RecentExpenses' component={RecentExpense}/>
      <BottomTab.Screen name='AllExpenses' component={AllExpenses}/>
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview}/>
          <Stack.Screen name='ManageExpense' component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
