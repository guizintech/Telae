import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';


type AuthContextType = {

  user: User | null;

  session: Session | null;

  loading: boolean;

  isGuest: boolean;

  continueAsGuest: () => void;

  logout: () => void;

};



const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);





export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  const [isGuest, setIsGuest] = useState(false);





  useEffect(() => {


    async function loadSession() {


      const remember =
        await AsyncStorage.getItem(
          'rememberLogin'
        );



      const {
        data,
      } = await supabase.auth.getSession();





      if (
        remember === 'true' &&
        data.session
      ) {


        setSession(data.session);

        setUser(
          data.session.user
        );


      } else {


        await supabase.auth.signOut();


      }



      setLoading(false);


    }




    loadSession();






    const {

      data: listener,

    } = supabase.auth.onAuthStateChange(

      (_event, session) => {


        setSession(session);


        setUser(
          session?.user ?? null
        );


      }

    );






    return () => {


      listener.subscription.unsubscribe();


    };


  }, []);







  function continueAsGuest(){

    setIsGuest(true);

  }







  async function logout(){


    await supabase.auth.signOut();


    await AsyncStorage.removeItem(
      'rememberLogin'
    );


    setUser(null);

    setSession(null);

  }






  return (

    <AuthContext.Provider

      value={{

        user,

        session,

        loading,

        isGuest,

        continueAsGuest,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}







export function useAuth(){

  return useContext(AuthContext);

}