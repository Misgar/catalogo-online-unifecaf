import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductCategory from './ProductCategory';

const Tab = createBottomTabNavigator();

export default function ProductListScreen({ navigation, setUser }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Masculino">
        {() => (
          <ProductCategory
            navigation={navigation}
            categories={['mens-shirts', 'mens-shoes', 'mens-watches']}
            setUser={setUser}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Feminino">
        {() => (
          <ProductCategory
            navigation={navigation}
            categories={[
              'womens-bags',
              'womens-dresses',
              'womens-jewellery',
              'womens-shoes',
              'womens-watches',
            ]}
            setUser={setUser}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
