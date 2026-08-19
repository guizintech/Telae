import StarRating from '@/components/StarRating';
import { searchMovies } from '@/services/tmdb';

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


const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';


export default function ReviewScreen() {

  const [rating, setRating] = useState(0);

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);



  async function handleSearch(text: string) {

    setSearch(text);

    if (text.length > 2) {

      const result = await searchMovies(text);

      console.log('FILMES:', result);

      setMovies(result);

    } else {

      setMovies([]);

    }

  }



  function selectMovie(movie: any) {

    setSelectedMovie(movie);

    setMovies([]);

    setSearch('');

    setShowSearch(false);

  }



  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Avaliar filme ⭐
      </Text>



      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowSearch(true)}
      >

        <Text style={styles.selectButtonText}>
          🎬 Selecionar filme
        </Text>

      </TouchableOpacity>



      {showSearch && (

        <TextInput

          style={styles.searchInput}

          placeholder="Digite o nome do filme..."

          placeholderTextColor="#999"

          value={search}

          onChangeText={handleSearch}

        />

      )}



      {movies.length > 0 && (

        <View style={styles.resultsContainer}>

          <Text style={styles.resultCount}>
            {movies.length} filmes encontrados
          </Text>


          <FlatList

            data={movies}

            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item }) => (

              <TouchableOpacity

                style={styles.movieResult}

                onPress={() => selectMovie(item)}

              >


                {item.poster_path ? (

                  <Image

                    source={{
                      uri: `${IMAGE_BASE}${item.poster_path}`,
                    }}

                    style={styles.smallPoster}

                  />

                ) : (

                  <View style={styles.noPoster}>

                    <Text>
                      🎬
                    </Text>

                  </View>

                )}




                <View>

                  <Text style={styles.resultTitle}>

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

      )}




      <View style={styles.moviePlaceholder}>


        {selectedMovie ? (

          <Image

            source={{

              uri: `${IMAGE_BASE}${selectedMovie.poster_path}`,

            }}

            style={styles.poster}

          />

        ) : (

          <Text style={styles.movieText}>
            🎬 Filme selecionado
          </Text>

        )}


      </View>




      <Text style={styles.label}>
        Minha nota
      </Text>



      <StarRating

        onChange={(value) => setRating(value)}

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

      />




      <TouchableOpacity style={styles.button}>

        <Text style={styles.buttonText}>
          Publicar avaliação
        </Text>

      </TouchableOpacity>


    </View>

  );

}




const styles = StyleSheet.create({


  container: {

    flex: 1,

    padding: 30,

    backgroundColor: '#000000',

  },



  title: {

    fontSize: 30,

    fontWeight: 'bold',

    marginTop: 50,

    color: '#ffffff',

  },



  selectButton: {

    backgroundColor: '#099292',

    paddingVertical: 12,

    paddingHorizontal: 25,

    borderRadius: 10,

    marginTop: 25,

    alignSelf: 'center',

  },



  selectButtonText: {

    color: '#ffffff',

    fontWeight: 'bold',

    fontSize: 16,

  },



  searchInput: {

    width: '100%',

    marginTop: 15,

    borderWidth: 1,

    borderColor: '#099292',

    borderRadius: 10,

    padding: 12,

    color: '#ffffff',

    backgroundColor: '#222222',

  },



  resultsContainer: {

    width: '100%',

    height: 260,

    marginTop: 10,

    backgroundColor: '#111111',

    borderRadius: 10,

    padding: 10,

  },



  resultCount: {

    color: '#ffffff',

    marginBottom: 5,

  },



  movieResult: {

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#222222',

    padding: 10,

    borderRadius: 10,

    marginBottom: 8,

  },



  smallPoster: {

    width: 45,

    height: 65,

    borderRadius: 5,

  },



  noPoster: {

    width: 45,

    height: 65,

    backgroundColor: '#555555',

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 5,

  },



  resultTitle: {

    color: '#ffffff',

    fontSize: 16,

    fontWeight: 'bold',

    marginLeft: 15,

  },



  year: {

    color: '#bbbbbb',

    marginLeft: 15,

    marginTop: 5,

  },



  moviePlaceholder: {

    width: 200,

    height: 260,

    backgroundColor: '#222222',

    borderRadius: 15,

    justifyContent: 'center',

    alignItems: 'center',

    marginVertical: 20,

    alignSelf: 'center',

    overflow: 'hidden',

  },



  poster: {

    width: '100%',

    height: '100%',

  },



  movieText: {

    color: '#ffffff',

    fontSize: 18,

  },



  label: {

    fontSize: 18,

    fontWeight: 'bold',

    marginTop: 15,

    color: '#ffffff',

  },



  note: {

    color: '#ffffff',

  },



  input: {

    width: '100%',

    height: 100,

    borderWidth: 1,

    borderRadius: 10,

    padding: 15,

    marginTop: 10,

    textAlignVertical: 'top',

    backgroundColor: '#ffffff',

    color: '#000000',

  },



  button: {

    backgroundColor: '#920909',

    paddingVertical: 15,

    paddingHorizontal: 40,

    borderRadius: 10,

    marginTop: 25,

    alignSelf: 'center',

  },



  buttonText: {

    color: '#ffffff',

    fontWeight: 'bold',

  },


});