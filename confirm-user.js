import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// You need to get the service_role key from Supabase dashboard > Settings > API
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Present' : 'Missing');
  console.error('\nAdd SUPABASE_SERVICE_ROLE_KEY to your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function confirmUser() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('Usage: node confirm-user.js <email>');
    console.log('Example: node confirm-user.js hakuzimanaprince1@gmail.com');
    process.exit(1);
  }

  try {
    // Get user by email
    const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();
    
    if (getUserError) {
      console.error('Error fetching users:', getUserError.message);
      process.exit(1);
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    // Update user to confirm email
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true
    });

    if (error) {
      console.error('Error confirming user:', error.message);
      process.exit(1);
    }

    console.log('✅ User email confirmed successfully!');
    console.log('Email:', email);
    console.log('User ID:', user.id);
    console.log('\nYou can now login at: http://localhost:5173/admin/login');
    
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

confirmUser();