// models/supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
// This file creates a Supabase client instance using the URL and service role key from environment variables.
// It exports the client instance for use in other parts of the application.