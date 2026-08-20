import StarRating from '@/components/StarRating';
import { useReview } from '@/contexts/ReviewContext';
import { getMovieDetails } from '@/services/tmdb';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';


export default function MovieReviewScreen() {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { addReview } = useReview();


  const [movie, setMovie] = useState<any>(null);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState('');

  const [loading, setLoading] = useState(true);




  useEffect(() => {

    async function loadMovie() {

      if (id) {

        const data = await getMovieDetails(
          id.toString()
        );

        setMovie(data);

        setLoading(false);

      }

    }


    loadMovie();

  }, [id]);






  if (loading) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="#ffffff"
        />

      </View>

    );

  }






  function publishReview() {

    addReview({

      id: Date.now().toString(),

      movieId: movie.id,

      movieTitle: movie.title,

      posterPath: movie.poster_path,

      rating,

      comment,

      createdAt: new Date().toISOString(),

    });


    router.back();

  }







  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Avaliar filme ⭐
      </Text>





      <View style={styles.moviePlaceholder}>


        {movie?.poster_path ? (

          <Image

            source={{

              uri:
                `${IMAGE_BASE}${movie.poster_path}`,

            }}

            style={styles.poster}

          />

        ) : (

          <Text style={styles.movieText}>
            🎬
          </Text>

        )}


      </View>





      <Text style={styles.movieTitle}>
        {movie?.title}
      </Text>





      <Text style={styles.label}>
        Minha nota
      </Text>





      <StarRating

        onChange={(value) =>
          setRating(value)
        }

      />





      <Text style={styles.note}>
        Nota: {rating}/5
      </Text>






      <Text style={styles.label}>
        Minha opinião
      </Text>





      <TextInput

        style={styles.input}

        placeholder="Escreva sua avaliação..."

        placeholderTextColor="#888"

        multiline

        value={comment}

        onChangeText={setComment}

      />







      <TouchableOpacity

        style={styles.button}

        onPress={publishReview}

      >

        <Text style={styles.buttonText}>
          Publicar avaliação
        </Text>

      </TouchableOpacity>





    </View>

  );

}







const styles = StyleSheet.create({

  container: {

    flex:1,

    padding:30,

    backgroundColor:'#000000',

  },


  loading: {

    flex:1,

    backgroundColor:'#000000',

    justifyContent:'center',

    alignItems:'center',

  },


  title: {

    fontSize:30,

    fontWeight:'bold',

    marginTop:50,

    color:'#ffffff',

  },


  moviePlaceholder: {

    width:200,

    height:260,

    backgroundColor:'#222222',

    borderRadius:15,

    justifyContent:'center',

    alignItems:'center',

    marginVertical:20,

    alignSelf:'center',

    overflow:'hidden',

  },


  poster: {

    width:'100%',

    height:'100%',

  },


  movieText: {

    color:'#ffffff',

    fontSize:30,

  },


  movieTitle: {

    color:'#ffffff',

    fontSize:22,

    fontWeight:'bold',

    textAlign:'center',

    marginBottom:10,

  },


  label: {

    fontSize:18,

    fontWeight:'bold',

    marginTop:15,

    color:'#ffffff',

  },


  note: {

    color:'#ffffff',

    marginTop:5,

  },


  input: {

    width:'100%',

    height:100,

    borderWidth:1,

    borderRadius:10,

    padding:15,

    marginTop:10,

    textAlignVertical:'top',

    backgroundColor:'#ffffff',

    color:'#000000',

  },


  button: {

    backgroundColor:'#920909',

    paddingVertical:15,

    paddingHorizontal:40,

    borderRadius:10,

    marginTop:25,

    alignSelf:'center',

  },


  buttonText: {

    color:'#ffffff',

    fontWeight:'bold',

  },


});