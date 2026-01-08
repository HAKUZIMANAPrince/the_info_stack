import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please check your .env file');
  process.exit(1);
}

if (!supabaseUrl.includes('supabase.co')) {
  console.error('Invalid Supabase URL. Should be in format: https://your-project.supabase.co');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdminUser() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: node create-admin.js <email> <password>');
    console.log('Example: node create-admin.js admin@example.com mypassword123');
    process.exit(1);
  }

  try {
    console.log('Creating admin user...');
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error creating admin user:', error.message);
      console.error('Full error:', error);
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!');
    console.log('Email:', email);
    console.log('User ID:', data.user?.id);
    console.log('\nYou can now login to the admin dashboard at: http://localhost:5173/admin/login');
    
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

createAdminUser();