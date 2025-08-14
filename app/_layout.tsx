import { Stack, useSegments, useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Usuario = { email: string };
type AuthContextType = {
  usuario: Usuario | null;
  logar: (email: string) => void;
  sair: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext não encontrado');
  return ctx;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [pronto, setPronto] = useState(true); // poderia reidratar do AsyncStorage no futuro

  const value = useMemo(
    () => ({
      usuario,
      logar: (email: string) => setUsuario({ email }),
      sair: () => setUsuario(null),
    }),
    [usuario]
  );

  if (!pronto) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Protege rotas: qualquer rota fora de (autenticacao) exige usuário logado
function GuardaRotas({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const emAuth = segments[0] === '(autenticacao)';

  useEffect(() => {
    if (!usuario && !emAuth) router.replace('(autenticacao)/login');
    if (usuario && emAuth) router.replace('(abas)');
  }, [usuario, emAuth, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GuardaRotas>
        <Stack screenOptions={{ headerTitle: 'Catálogo' }}>
          <Stack.Screen name="(autenticacao)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(abas)" options={{ headerShown: false }} />
          <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes do Produto' }} />
        </Stack>
      </GuardaRotas>
    </AuthProvider>
  );
}
