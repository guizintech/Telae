import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        🎬
      </Text>

      <Text style={styles.title}>
        Telaê
      </Text>

      <Text style={styles.subtitle}>
        Seu universo de filmes e séries
      </Text>

      <Text style={styles.description}>
        Descubra filmes, avalie suas experiências
        e compartilhe suas opiniões.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.primaryButtonText}>
          Criar conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/tabs')}
      >
        <Text style={styles.secondaryButtonText}>
          Já tenho conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },

  description: {
    marginTop: 25,
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    lineHeight: 24,
  },

  primaryButton: {
    marginTop: 45,
    backgroundColor: '#920909',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  secondaryButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#555',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#fff',
    fontSize: 17,
  },
});