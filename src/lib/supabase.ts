import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(

  'https://nmwcglmvqfuhnozsanak.supabase.co',

  'sb_publishable_4vmOjfcY4kwghkSzv7z5ow_BISfudhN',

  {

    auth: {

      storage: AsyncStorage,

      autoRefreshToken: true,

      persistSession: true,

      detectSessionInUrl: false,

    },

  }

);