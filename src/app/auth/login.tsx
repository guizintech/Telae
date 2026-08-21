import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
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



export default function LoginScreen() {


  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [remember, setRemember] = useState(false);





  async function handleLogin() {


    if (!email || !password) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;

    }





    const {
      error,
    } = await supabase.auth.signInWithPassword({

      email: email.trim(),

      password,

    });

    if (remember) {

  await AsyncStorage.setItem(
    'rememberLogin',
    'true'
  );

} else {

  await AsyncStorage.setItem(
    'rememberLogin',
    'false'
  );

  await supabase.auth.signOut();

}



    if (error) {

      Alert.alert(
        'Erro',
        error.message
      );

      return;

    }





    if (remember) {


      await AsyncStorage.setItem(
        'rememberLogin',
        'true'
      );


    } else {


      await AsyncStorage.setItem(
        'rememberLogin',
        'false'
      );


    }





    router.replace('/tabs');


  }








  return (

    <View style={styles.container}>


      <Text style={styles.logo}>
        🎬
      </Text>




      <Text style={styles.title}>
        Bem-vindo ao Telaê
      </Text>




      <Text style={styles.subtitle}>
        Entre na sua conta
      </Text>






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

        style={styles.rememberBox}

        onPress={() => setRemember(!remember)}

      >


        <View

          style={[

            styles.checkbox,

            remember && styles.checkboxActive

          ]}

        >

          {
            remember && (

              <Text style={styles.checkIcon}>
                ✓
              </Text>

            )
          }


        </View>




        <Text style={styles.rememberText}>
          Lembrar de mim
        </Text>



      </TouchableOpacity>







      <TouchableOpacity

        style={styles.button}

        onPress={handleLogin}

      >

        <Text style={styles.buttonText}>
          Entrar
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

    fontSize:30,

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





  rememberBox: {

    flexDirection:'row',

    alignItems:'center',

    marginTop:5,

  },





  checkbox: {

    width:22,

    height:22,

    borderRadius:6,

    borderWidth:2,

    borderColor:'#666',

    justifyContent:'center',

    alignItems:'center',

  },





  checkboxActive: {

    backgroundColor:'#920909',

    borderColor:'#920909',

  },





  checkIcon: {

    color:'#fff',

    fontSize:15,

    fontWeight:'bold',

  },





  rememberText: {

    color:'#fff',

    fontSize:15,

    marginLeft:10,

  },





  button: {

    marginTop:30,

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