from supabase import create_client, Client
from ..Core.config import SUPABASE_URL, SUPABASE_KEY

# Initializing a Supabase client for database interactions.
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
