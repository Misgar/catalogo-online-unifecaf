import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, ActivityIndicator, Alert } from 'react-native';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function ProductCategory({ navigation, categories, setUser }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        let allProducts = [];
        for (let category of categories) {
          const res = await api.get(`/products/category/${category}`);
          allProducts = [...allProducts, ...res.data.products];
        }
        setProducts(allProducts);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Logout" color="red" onPress={() => setUser(null)} />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detalhes', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
