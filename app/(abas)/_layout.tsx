import { Tabs } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../_layout';

export default function LayoutAbas() {
  const { sair } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={sair} style={{ paddingHorizontal: 12 }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen name="masculino" options={{ title: 'Masculino' }} />
      <Tabs.Screen name="feminino" options={{ title: 'Feminino' }} />
    </Tabs>
  );
}
