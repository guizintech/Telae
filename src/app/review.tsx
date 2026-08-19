import StarRating from '@/components/StarRating';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReviewScreen() {
    const [rating, setRating] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Avaliar filme ⭐
      </Text>

      <View style={styles.moviePlaceholder}>
        <Text style={styles.movieText}>
          🎬 Filme selecionado
        </Text>
      </View>

      <Text style={styles.label}>
        Minha nota
      </Text>

      <StarRating
  onChange={(value) => setRating(value)}
/>

<Text>
  Nota: {rating}/5
</Text>

      <Text style={styles.label}>
        Minha opinião
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escreva sua avaliação..."
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
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#fff',
  },

  moviePlaceholder: {
    width: 200,
    height: 260,
    backgroundColor: '#ddd',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },

  movieText: {
    fontSize: 18,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 15,
    color: '#fff',
  },

  stars: {
    fontSize: 40,
    marginVertical: 10,
    color: '#fff',
  },

  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#fff',
  },

  button: {
    backgroundColor: '#920909',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  starsContainer: {
  flexDirection: 'row',
  marginVertical: 10,
  color:'#fff',
},

star: {
  fontSize: 40,
  marginHorizontal: 5,
  color:'#fff',
},
});