from fastapi import APIRouter, Depends, HTTPException
from ..Database.supabase import supabase
from ..Core.jwt import get_current_user
from typing import Any

router = APIRouter()

# Endpoint for retrieving all posts for student users, ensuring proper role authorization.
@router.get("/post")
def club_read_posts(data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "student":
            response = supabase.table("posts").select("*, user_to_role(user_name)").execute()
            if not response.data:
                raise HTTPException(status_code=404, detail="No Posts Found For This Club")
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        print(f"error: {he.detail}")
        raise he
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return response.data

# Endpoint for retrieving a post for students, ensuring proper role authorization..
@router.get("/post/{id}")
def club_read_post(id: str, data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "student":
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
