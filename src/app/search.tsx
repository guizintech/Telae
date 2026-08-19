import { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { searchMovies } from '@/services/tmdb';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  async function handleSearch(text: string) {
    setQuery(text);

    if (text.length > 2) {
      const result = await searchMovies(text);
      setMovies(result);
    } else {
      setMovies([]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Buscar 🔎
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um filme..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>

            {item.poster_path ? (
              <Image
                source={{
                  uri: `${IMAGE_BASE}${item.poster_path}`,
                }}
                style={styles.poster}
              />
            ) : (
              <View style={styles.noPoster}>
                <Text style={styles.noPosterText}>
                  🎬
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.movieTitle}>
                {item.title}
              </Text>

              <Text style={styles.year}>
                {item.release_date?.slice(0, 4)}
              </Text>
            </View>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#ffffff',
  },

  input: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    padding: 15,
    color: '#ffffff',
  },

  card: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
    alignItems: 'center',
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },

  noPoster: {
    width: 70,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },

  noPosterText: {
    fontSize: 25,
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  year: {
    marginTop: 5,
    fontSize: 16,
    color: '#cccccc',
  },
});