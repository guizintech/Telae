import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        🎬
      </Text>

      <Text style={styles.title}>
        Criar conta
      </Text>

      <Text style={styles.subtitle}>
        Entre para o universo Telaê
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TextInput
        placeholder="@Usuário"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/tabs')}
      >
        <Text style={styles.buttonText}>
          Continuar
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
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 35,
  },

  input: {
    backgroundColor: '#161616',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#920909',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});