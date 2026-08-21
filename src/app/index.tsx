import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useEffect } from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';



export default function HomeScreen() {


  const {
    loading,
    continueAsGuest,
  } = useAuth();





  useEffect(() => {


    let mounted = true;



    async function checkSession() {


      const {
        data,
      } = await supabase.auth.getSession();




      if (
        data.session &&
        mounted
      ) {


        setTimeout(() => {


          router.replace('/tabs');


        }, 100);



      }


    }



    checkSession();




    return () => {


      mounted = false;


    };


  }, []);







  if (loading) {


    return (

      <View style={styles.container}>


        <ActivityIndicator

          size="large"

          color="#fff"

        />


      </View>

    );


  }







  return (

    <View style={styles.container}>


      <Text style={styles.logo}>
        🎬
      </Text>




      <Text style={styles.title}>
        Telaê
      </Text>




      <Text style={styles.subtitle}>
        Seu universo de filmes e séries
      </Text>




      <Text style={styles.description}>
        Descubra filmes, avalie suas experiências
        e compartilhe suas opiniões.
      </Text>





      <TouchableOpacity

        style={styles.primaryButton}

        onPress={() => router.push('/register')}

      >

        <Text style={styles.primaryButtonText}>
          Criar conta
        </Text>


      </TouchableOpacity>






      <TouchableOpacity

        style={styles.secondaryButton}

        onPress={() => router.push('/auth/login')}

      >

        <Text style={styles.secondaryButtonText}>
          Já tenho conta
        </Text>


      </TouchableOpacity>






      <TouchableOpacity

        style={styles.guestButton}

        onPress={() => {


          continueAsGuest();


          router.replace('/tabs');


        }}

      >

        <Text style={styles.guestButtonText}>
          Continuar sem conta
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

    alignItems:'center',

    paddingHorizontal:30,

  },



  logo: {

    fontSize:70,

    marginBottom:10,

  },



  title: {

    fontSize:42,

    fontWeight:'bold',

    color:'#fff',

  },



  subtitle: {

    marginTop:10,

    fontSize:18,

    color:'#aaa',

    textAlign:'center',

  },



  description: {

    marginTop:25,

    fontSize:16,

    color:'#ddd',

    textAlign:'center',

    lineHeight:24,

  },



  primaryButton: {

    marginTop:45,

    backgroundColor:'#920909',

    width:'100%',

    paddingVertical:15,

    borderRadius:12,

    alignItems:'center',

  },



  primaryButtonText: {

    color:'#fff',

    fontSize:17,

    fontWeight:'bold',

  },



  secondaryButton: {

    marginTop:15,

    borderWidth:1,

    borderColor:'#555',

    width:'100%',

    paddingVertical:15,

    borderRadius:12,

    alignItems:'center',

  },



  secondaryButtonText: {

    color:'#fff',

    fontSize:17,

  },



  guestButton: {

    marginTop:18,

  },



  guestButtonText: {

    color:'#aaa',

    fontSize:16,

  },


});