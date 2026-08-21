import { supabase } from './lib/supabase';

async function testSupabase() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.log('Erro Supabase:', error.message);
  } else {
    console.log('Profiles conectado:', data);
  }
}

testSupabase();