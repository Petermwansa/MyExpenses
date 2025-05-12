import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { InputAccessoryView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500
      },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500
    }}>
      <BottomTab.Screen 
        name='RecentExpenses' 
        component={RecentExpense}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color,size}) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      />
      <BottomTab.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color,size}) => <Ionicons name='calendar' size={size} color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}



export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='ExpensesOverview' 
            component={ExpensesOverview} 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='ManageExpense' component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
