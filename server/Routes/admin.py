from fastapi import APIRouter, Header, HTTPException, Depends
from ..Models.schemas import Post, SignupClub
from ..Database.supabase import supabase
from ..Core.jwt import get_current_user
from typing import Any

router = APIRouter()

# Endpoint for administrators to create a new post, ensuring proper role authorization.
@router.post("/post")
def admin_create_post(post: Post, data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "admin":
            supabase.table("posts").insert({
                "post_title": post.post_title,
                "post_body": post.post_body,
                "post_expiray_date": post.post_expiray_date,
                "posted_by": data["user_id"]
            }).execute()
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        print(f"error: {he.detail}")
        raise he
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return {"msg": "Post Created Successfully"}

# Endpoint for administrators to retrieve all posts, ensuring proper role authorization.
@router.get("/post")
def admin_read_posts(data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == 'admin':
            response = supabase.table("posts").select("*, user_to_role(user_name)").execute()
            print(response.data)
            if not response.data:
                raise HTTPException(status_code=400, detail="No Post Found")
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        print(f"error: {he.detail}")
        raise he
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return response.data

# Endpoint for administrators to retrieve a post, ensuring proper role authorization.
@router.get("/post/{id}")
def club_read_post(id: str, data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "admin":
            response = supabase.table("posts").select("*, user_to_role(user_name)").eq("post_id", id).execute()
            if not response.data:
                raise HTTPException(status_code=404, detail=f"No Post Found By {id}")
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        print(f"error: {he.detail}")
        raise he
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return response.data

# Endpoint for administrators to create account for clubs, ensuring proper role authorization.
@router.post("/auth_club")
def admin_auth_club(club: SignupClub, data:dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "admin":
            response = supabase.auth.sign_up({"email": club.email, "password": club.password})
        
            if not response:
                raise Exception
            
            club_id = supabase.auth.get_user().user.id
            
            # Inserting the user's ID into the 'user_to_role' database to associate the user with a specific role upon sign-in.
            supabase.table("user_to_role").insert({"id": club_id, "Role": "club", "user_name": club.name}).execute()
        
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        print(f"error: {he.detail}")
        raise he
    
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")