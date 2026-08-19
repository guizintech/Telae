import { StyleSheet, Text, View } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Buscar 🔎
      </Text>

      <Text style={styles.subtitle}>
        Encontre filmes e séries
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});