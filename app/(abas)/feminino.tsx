import { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import CartaoProduto from '../../src/components/CartaoProduto';
import useProdutos from '../../src/hooks/useProdutos';

const CATEGORIAS_FEM = ['womens-bags','womens-dresses','womens-jewellery','womens-shoes','womens-watches'];

export default function ListaFeminino() {
  const router = useRouter();
  const { itens, carregando, atualizar } = useProdutos(CATEGORIAS_FEM, 'feminino');

  useEffect(() => { atualizar(); }, []);

  return (
    <View style={{ flex:1 }}>
      {carregando && itens.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CartaoProduto
              produto={item}
              onPress={() => router.push(`/produto/${item.id}`)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={carregando} onRefresh={() => atualizar(true)} />
          }
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </View>
  );
}
