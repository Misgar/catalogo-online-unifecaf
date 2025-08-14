import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../../src/services/api';
import { Produto } from '../../src/types/produto';

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dados, setDados] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    api.get(`/products/${id}`)
      .then(res => { if (ativo) setDados(res.data); })
      .catch(() => { Alert.alert('Erro', 'Não foi possível carregar o produto.'); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  if (carregando) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (!dados) return <Text style={{ padding:16 }}>Sem dados do produto.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!dados.thumbnail && (
        <Image source={{ uri: dados.thumbnail }} style={styles.img} resizeMode="cover" />
      )}
      <Text style={styles.titulo}>{dados.title}</Text>
      <Text style={styles.desc}>{dados.description}</Text>
      <Text style={styles.preco}>Preço: ${dados.price}</Text>
      {'discountPercentage' in dados && (
        <Text style={styles.desconto}>Desconto: {dados.discountPercentage}%</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ padding:16 },
  img:{ width:'100%', height:240, borderRadius:8, marginBottom:12 },
  titulo:{ fontSize:20, fontWeight:'700', marginBottom:8 },
  desc:{ fontSize:14, marginBottom:12 },
  preco:{ fontSize:16, fontWeight:'600', marginBottom:4 },
  desconto:{ fontSize:14 }
});
