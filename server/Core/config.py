# Loading configuration files and retrieving API keys from environment variables.
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
