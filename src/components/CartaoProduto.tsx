import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Produto } from '../types/produto';

export default function CartaoProduto({ produto, onPress }:{
  produto: Produto;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {produto.thumbnail ? (
        <Image source={{ uri: produto.thumbnail }} style={styles.thumb} />
      ) : null}
      <View style={{ flex:1 }}>
        <Text numberOfLines={1} style={styles.titulo}>{produto.title}</Text>
        <Text numberOfLines={2} style={styles.desc}>{produto.description}</Text>
        <Text style={styles.preco}>${produto.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{ flexDirection:'row', gap:12, padding:12, borderWidth:1, borderRadius:10, marginBottom:10, alignItems:'center' },
  thumb:{ width:72, height:72, borderRadius:8 },
  titulo:{ fontWeight:'700', marginBottom:4 },
  desc:{ fontSize:12, marginBottom:6 },
  preco:{ fontWeight:'600' }
});
