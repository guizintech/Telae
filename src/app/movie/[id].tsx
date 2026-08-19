import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getMovieDetails } from '@/services/tmdb';
import { useLocalSearchParams, useRouter } from 'expo-router';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;


  useEffect(() => {
    async function loadMovie() {
      if (id) {
        const data = await getMovieDetails(id.toString());

        setMovie(data);
        setLoading(false);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),

          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }

    loadMovie();
  }, [id]);


  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }


  if (!movie) {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>
          Filme não encontrado
        </Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      {/* BOTÃO X VOLTAR */}
      <Pressable
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>
          ✕
        </Text>
      </Pressable>


      <ScrollView>

        <Animated.View style={{ opacity: fadeAnim }}>

          {movie.backdrop_path && (
            <Pressable
              onPress={() => setImageVisible(true)}
            >
              <Image
                source={{
                  uri: `${IMAGE_BASE}${movie.backdrop_path}`,
                }}
                style={styles.banner}
              />
            </Pressable>
          )}

        </Animated.View>


        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}
        >

          <Text style={styles.title}>
            {movie.title}
          </Text>


          <Text style={styles.info}>
            {movie.release_date?.slice(0, 4)}
            {'  •  '}
            ⭐ {movie.vote_average?.toFixed(1)} / 10
          </Text>


          <Text style={styles.sectionTitle}>
            Sinopse
          </Text>


          <Text style={styles.description}>
            {movie.overview || 'Sem sinopse disponível.'}
          </Text>


          <Text style={styles.sectionTitle}>
            Gêneros
          </Text>


          <Text style={styles.description}>
            {movie.genres
              ?.map((genre: any) => genre.name)
              .join(', ')}
          </Text>


          <Text style={styles.sectionTitle}>
            Duração
          </Text>


          <Text style={styles.description}>
            {movie.runtime} minutos
          </Text>


        </Animated.View>

      </ScrollView>



      {/* MODAL DA IMAGEM */}
      <Modal
        visible={imageVisible}
        transparent
        animationType="fade"
      >

        <View style={styles.modalContainer}>

          <Pressable
            style={styles.imageCloseButton}
            onPress={() => setImageVisible(false)}
          >
            <Text style={styles.closeText}>
              ✕
            </Text>
          </Pressable>


          <Image
            source={{
              uri: `${IMAGE_BASE}${movie.backdrop_path}`,
            }}
            style={styles.fullImage}
            resizeMode="contain"
          />


        </View>

      </Modal>


    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },


  loading: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },


  banner: {
    width: '100%',
    height: 260,
  },


  content: {
    padding: 25,
  },


  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },


  info: {
    marginTop: 10,
    fontSize: 18,
    color: '#cccccc',
  },


  sectionTitle: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },


  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#dddddd',
  },


  text: {
    color: '#ffffff',
    fontSize: 18,
  },


  closeButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },


  imageCloseButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },


  closeText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },


  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },


  fullImage: {
    width: '100%',
    height: '80%',
  },

});