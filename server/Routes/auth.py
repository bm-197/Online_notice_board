from fastapi import APIRouter
from ..Models.schemas import SignupUser, SigninUser
from ..Database.supabase import supabase

router = APIRouter()

# Endpoint for user sign-up, creating a new user and assigning a role.
@router.post("/signup")
def sign_up(user: SignupUser):
    try:
        response = supabase.auth.sign_up({"email": user.email, "password": user.password})
        user_id = supabase.auth.get_user().user.id
        
        # Inserting the user's ID into the 'user_to_role' database to associate the user with a specific role upon sign-in.
        supabase.table("user_to_role").insert({"id": user_id, "Role": user.role}).execute()
        return {"success": "yes", "user_id": user_id, "role": user.role}
    except Exception as e:
        return {"success": "no", "error": str(e)}

# Endpoint for user sign-in, handling authentication and role assignment.
@router.post("/signin")
def sign_in(user: SigninUser):
    try:
        response = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        user_id = supabase.auth.get_user().user.id
        
        # Accessing the user's role during sign-in to determine the appropriate page for redirection.
        role_response = supabase.table("user_to_role").select("Role").eq("id", user_id).execute()
        role = role_response.data[0]["Role"]
        return {"success": "yes", "role": role, "user_id": user_id}
    except Exception as e:
        return {"success": "no", "error": str(e)}
