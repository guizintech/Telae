import StarRating from '@/components/StarRating';
import { useReview } from '@/contexts/ReviewContext';
import { useUser } from '@/contexts/UserContext';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';


export default function ProfileScreen() {

  const { user } = useUser();

  const { reviews } = useReview();


  return (

    <ScrollView style={styles.container}>


      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          👤
        </Text>
      </View>


      <Text style={styles.name}>
        {user?.name || 'Usuário Telaê'}
      </Text>


      <Text style={styles.username}>
        @{user?.username || 'usuario'}
      </Text>



      <View style={styles.stats}>


        <View style={styles.stat}>
          <Text style={styles.number}>
            {reviews.length}
          </Text>

          <Text style={styles.label}>
            Avaliações
          </Text>
        </View>



        <View style={styles.stat}>
          <Text style={styles.number}>
            0
          </Text>

          <Text style={styles.label}>
            Seguidores
          </Text>
        </View>



        <View style={styles.stat}>
          <Text style={styles.number}>
            0
          </Text>

          <Text style={styles.label}>
            Seguindo
          </Text>
        </View>


      </View>




      <Text style={styles.section}>
        Minhas avaliações
      </Text>




      {
        reviews.length === 0 ? (

          <Text style={styles.empty}>
            Você ainda não avaliou nenhum filme.
          </Text>


        ) : (


          reviews.map((review)=>(


            <View
              key={review.id}
              style={styles.reviewCard}
            >


              {
                review.posterPath && (

                  <Image

                    source={{
                      uri:`${IMAGE_BASE}${review.posterPath}`
                    }}

                    style={styles.poster}

                  />

                )
              }




              <View style={styles.reviewInfo}>


                <Text style={styles.movieTitle}>
                  {review.movieTitle}
                </Text>




                <View style={styles.ratingRow}>


                  <View style={styles.starBox}>

                    <StarRating
                      value={review.rating}
                    />

                  </View>




                  <Text style={styles.ratingNumber}>
                    {review.rating}/5
                  </Text>


                </View>





                <Text style={styles.comment}>
                  "{review.comment || 'Sem comentário'}"
                </Text>


              </View>


            </View>


          ))

        )
      }



    </ScrollView>

  );

}





const styles = StyleSheet.create({


  container:{
    flex:1,
    backgroundColor:'#000',
    padding:30,
  },


  avatar:{
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:'#222',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:50,
  },


  avatarText:{
    fontSize:45,
  },


  name:{
    marginTop:20,
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center',
  },


  username:{
    marginTop:5,
    fontSize:16,
    color:'#aaa',
    textAlign:'center',
  },


  stats:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:40,
  },


  stat:{
    alignItems:'center',
  },


  number:{
    fontSize:22,
    fontWeight:'bold',
    color:'#fff',
  },


  label:{
    color:'#fff',
    marginTop:5,
  },


  section:{
    marginTop:50,
    fontSize:22,
    fontWeight:'bold',
    color:'#fff',
  },


  empty:{
    color:'#aaa',
    marginTop:20,
  },


  reviewCard:{
    flexDirection:'row',
    backgroundColor:'#111',
    marginTop:20,
    padding:15,
    borderRadius:15,
  },


  poster:{
    width:80,
    height:120,
    borderRadius:10,
  },


  reviewInfo:{
    flex:1,
    marginLeft:15,
  },


  movieTitle:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },



  ratingRow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:8,
  },



  starBox:{
    width:240,
    height:55,
    overflow:'hidden',

    transform:[
      {
        scale:0.65
      }
    ],

    transformOrigin:'left center',
  },



  ratingNumber:{
    color:'#fff',
    fontSize:15,
    marginLeft:-90,
  },



  comment:{
    marginTop:10,
    color:'#ccc',
    fontSize:16,
    lineHeight:20,
  },


});