import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#777777',
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
        }}
      />

      <Tabs.Screen
        name="review"
        options={{
          title: 'Avaliações',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
        }}
      />

    </Tabs>
  );
}