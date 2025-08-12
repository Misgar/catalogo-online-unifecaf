import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../services/api';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadDetail();
  }, [id]);

  if (!product) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text style={styles.price}>Preço: ${product.price}</Text>
      <Text>Desconto: {product.discountPercentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: 'green', marginTop: 10 },
});
