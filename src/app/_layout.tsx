import { AuthProvider } from '@/contexts/AuthContext';
import { ReviewProvider } from '@/contexts/ReviewContext';
import { UserProvider } from '@/contexts/UserContext';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';


SplashScreen.preventAutoHideAsync();



export default function RootLayout() {

  const colorScheme = useColorScheme();


  return (

    <AuthProvider>

      <UserProvider>

        <ReviewProvider>


          <ThemeProvider

            value={
              colorScheme === 'dark'
                ? DarkTheme
                : DefaultTheme
            }

          >


            <AnimatedSplashOverlay />



            <Stack

              screenOptions={{

                headerShown: false,

                animation: 'slide_from_right',

                animationDuration: 300,

              }}

            />



          </ThemeProvider>


        </ReviewProvider>


      </UserProvider>


    </AuthProvider>

  );

}