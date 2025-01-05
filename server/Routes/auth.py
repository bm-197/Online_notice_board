from fastapi import APIRouter, HTTPException, Depends
from ..Models.schemas import SignupUser, SigninUser
from ..Database.supabase import supabase
from ..Core.jwt import create_token

router = APIRouter()

# Endpoint for user sign-up, creating a new user and assigning a role.
@router.post("/signup")
def sign_up(user: SignupUser):
    try:
        response = supabase.auth.sign_up({"email": user.email, "password": user.password})
        
        if not response:
            raise Exception
        
        user_id = supabase.auth.get_user().user.id
        
        # Inserting the user's ID into the 'user_to_role' database to associate the user with a specific role upon sign-in.
        supabase.table("user_to_role").insert({"id": user_id, "Role": user.role}).execute()
    
    except HTTPException as he:
        print(f"error: {he}")
        return he
    except Exception as e:
        print(f"Internal Sever error: {e}")
        return HTTPException(status_code=500, detail="Internal Server Error")
    
    return {"msg": "User Created Successfully"}

# Endpoint for user sign-in, handling authentication and role assignment.
@router.post("/signin")
def sign_in(user: SigninUser):
    try:
        response = supabase.auth.sign_in_with_password({"email": user.email, "password": user.password})
        if not response:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        user_id = supabase.auth.get_user().user.id
        
        # Accessing the user's role during sign-in to determine the appropriate page for redirection.
        role_response = supabase.table("user_to_role").select("Role").eq("id", user_id).execute()
        role = role_response.data[0]["Role"]
        
        token = create_token({"user_id": user_id, "email": user.email, "role": role})
    except HTTPException as he:
        raise he

    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return { "access_token": token, "token_type": "Bearer" }
