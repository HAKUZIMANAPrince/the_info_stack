import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function resetPassword() {
  const email = process.argv[2];
  const newPassword = process.argv[3];
  
  if (!email || !newPassword) {
    console.log('Usage: node reset-password.js <email> <new-password>');
    console.log('Example: node reset-password.js hakuzimanaprince1@gmail.com newpassword123');
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

    // Update user password and confirm email
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword,
      email_confirm: true
    });

    if (error) {
      console.error('Error updating user:', error.message);
      process.exit(1);
    }

    console.log('✅ User password reset successfully!');
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    console.log('User ID:', user.id);
    console.log('\nYou can now login at: http://localhost:5173/admin/login');
    
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

resetPassword();