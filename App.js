import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); // null = não logado

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Produtos">
              {(props) => <ProductListScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Detalhes" component={ProductDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
