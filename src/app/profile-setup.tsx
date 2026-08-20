import { useUser } from '@/contexts/UserContext';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const genres = [
  'Ação',
  'Terror',
  'Drama',
  'Comédia',
  'Ficção',
  'Anime',
  'Romance',
  'Suspense',
];

export default function ProfileSetupScreen() {
  const { updateUser } = useUser();

  const [bio, setBio] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function toggleGenre(genre: string) {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((item) => item !== genre)
      );
    } else {
      setSelectedGenres([
        ...selectedGenres,
        genre,
      ]);
    }
  }

  function handleContinue() {
    updateUser({
      bio,
      genres: selectedGenres,
    });

    router.replace('/tabs');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Complete seu perfil
      </Text>

      <Text style={styles.subtitle}>
        Conte um pouco sobre seu gosto por filmes 🎬
      </Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          👤
        </Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.photoText}>
          Escolher foto
        </Text>
      </TouchableOpacity>


      <TextInput
        placeholder="Sua bio..."
        placeholderTextColor="#888"
        multiline
        style={styles.input}
        value={bio}
        onChangeText={setBio}
      />


      <Text style={styles.genreTitle}>
        Seus gêneros favoritos
      </Text>


      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genre,
              selectedGenres.includes(genre) && styles.selectedGenre,
            ]}
            onPress={() => toggleGenre(genre)}
          >
            <Text style={styles.genreText}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Começar a explorar
        </Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  avatarText: {
    fontSize: 40,
  },

  photoText: {
    color: '#920909',
    textAlign: 'center',
    marginVertical: 15,
  },

  input: {
    backgroundColor: '#161616',
    color: '#fff',
    borderRadius: 12,
    padding: 15,
    height: 90,
    textAlignVertical: 'top',
  },

  genreTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },

  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  genre: {
    backgroundColor: '#222',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },

  selectedGenre: {
    backgroundColor: '#920909',
  },

  genreText: {
    color: '#fff',
  },

  button: {
    marginTop: 35,
    backgroundColor: '#920909',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});