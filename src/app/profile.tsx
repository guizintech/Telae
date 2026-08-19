import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>

      <Text style={styles.name}>
        Usuário Telaê
      </Text>

      <Text style={styles.username}>
        @usuario
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.number}>0</Text>
          <Text>Avaliações</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.number}>0</Text>
          <Text>Seguidores</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.number}>0</Text>
          <Text>Seguindo</Text>
        </View>
      </View>

      <Text style={styles.section}>
        Minhas avaliações
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },

  avatarText: {
    fontSize: 45,
    color: '#fff',
  },

  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  username: {
    marginTop: 5,
    fontSize: 16,
    color: '#fff',
  },

  stats: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 25,
    color: '#fff',
  },

  stat: {
    alignItems: 'center',
    color: '#fff',
  },

  number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  section: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});