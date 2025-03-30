import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoginScreen from '../screens/auth/LoginScreen';
import InvoiceListScreen from '../screens/invoice/InvoiceListScreen';
import CreateInvoiceScreen from '../screens/invoice/CreateInvoiceScreen';
import InvoiceDetailScreen from '../screens/invoice/InvoiceDetailScreen';
import { LogoutButton } from '../components/common';
import { Invoice } from '../types/invoice.types';

export type RootStackParamList = {
  Login: undefined;
  Invoices: undefined;
  CreateInvoice: undefined;
  InvoiceDetail: { invoice: Invoice };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
        ) : (
          <>
            <Stack.Screen 
              name="Invoices" 
              component={InvoiceListScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <LogoutButton onPress={() => navigation.navigate('Login')} />
                ),
              })}
            />
            <Stack.Screen name="CreateInvoice" component={CreateInvoiceScreen} />
            <Stack.Screen 
              name="InvoiceDetail" 
              component={InvoiceDetailScreen}
              options={{ title: 'Invoice Detail' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;