import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


export default function RegisterScreen() {


  const [name, setName] = useState('');

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');




  async function handleRegister() {


    if (!name || !username || !email || !password) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;

    }





    const {
      data,
      error,
    } = await supabase.auth.signUp({

      email: email.trim(),

      password,

    });





    if (error) {

      Alert.alert(
        'Erro',
        error.message
      );

      return;

    }





    if (!data.user) {

      Alert.alert(
        'Erro',
        'Usuário não criado.'
      );

      return;

    }





    // cria perfil no banco

    const {
      error: profileError,
    } = await supabase

      .from('profiles')

      .insert({

        id: data.user.id,

        name: name.trim(),

        username: username.trim(),

      });






    if (profileError) {

      Alert.alert(
        'Erro perfil',
        profileError.message
      );

      return;

    }





    // verifica se existe sessão

    const {
      data: sessionData,
    } = await supabase.auth.getSession();






    if (!sessionData.session) {


      const {
        error: loginError,
      } = await supabase.auth.signInWithPassword({

        email: email.trim(),

        password,

      });




      if (loginError) {

        Alert.alert(
          'Erro login automático',
          loginError.message
        );

        return;

      }


    }






    Alert.alert(

      'Conta criada!',

      'Bem-vindo ao Telaê.',

      [

        {

          text:'Continuar',

          onPress: () => {

            router.replace('/tabs');

          },

        },

      ]

    );


  }







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

        value={name}

        onChangeText={setName}

      />





      <TextInput

        placeholder="@Usuário"

        placeholderTextColor="#888"

        style={styles.input}

        value={username}

        onChangeText={setUsername}

        autoCapitalize="none"

      />





      <TextInput

        placeholder="Email"

        placeholderTextColor="#888"

        keyboardType="email-address"

        autoCapitalize="none"

        style={styles.input}

        value={email}

        onChangeText={setEmail}

      />





      <TextInput

        placeholder="Senha"

        placeholderTextColor="#888"

        secureTextEntry

        style={styles.input}

        value={password}

        onChangeText={setPassword}

      />





      <TouchableOpacity

        style={styles.button}

        onPress={handleRegister}

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

    flex:1,

    backgroundColor:'#000',

    justifyContent:'center',

    paddingHorizontal:30,

  },


  logo: {

    fontSize:60,

    textAlign:'center',

    marginBottom:10,

  },


  title: {

    color:'#fff',

    fontSize:32,

    fontWeight:'bold',

    textAlign:'center',

  },


  subtitle: {

    color:'#aaa',

    fontSize:16,

    textAlign:'center',

    marginTop:10,

    marginBottom:35,

  },


  input: {

    backgroundColor:'#161616',

    color:'#fff',

    borderRadius:12,

    paddingHorizontal:15,

    paddingVertical:14,

    marginBottom:15,

    fontSize:16,

  },


  button: {

    marginTop:20,

    backgroundColor:'#920909',

    paddingVertical:15,

    borderRadius:12,

    alignItems:'center',

  },


  buttonText: {

    color:'#fff',

    fontSize:17,

    fontWeight:'bold',

  },


});