import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Telaê 🎬
      </Text>

      <Text style={styles.subtitle}>
        Seu universo de filmes e séries
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});