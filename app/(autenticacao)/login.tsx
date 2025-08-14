import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../_layout';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { logar } = useAuth();

  function handleLogin() {
    if (!email.includes('@')) {
      Alert.alert('Validação', 'Informe um e-mail válido.');
      return;
    }
    if (senha.length < 4) {
      Alert.alert('Validação', 'Senha deve ter pelo menos 4 caracteres.');
      return;
    }
    logar(email);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo</Text>
      <TextInput
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.botao}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', padding:24 },
  titulo:{ fontSize:24, fontWeight:'600', marginBottom:16 },
  input:{ borderWidth:1, borderRadius:8, padding:12, marginBottom:12 },
  botao:{ padding:14, borderRadius:8, alignItems:'center', borderWidth:1 },
  botaoTexto:{ fontSize:16, fontWeight:'600' },
});
