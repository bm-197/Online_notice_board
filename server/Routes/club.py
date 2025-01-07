from fastapi import APIRouter, Header, Depends, HTTPException
from ..Models.schemas import Post
from ..Database.supabase import supabase
from ..Core.jwt import get_current_user
from typing import Any

router = APIRouter()

# Endpoint for creating a post by club users, ensuring proper role authorization.
@router.post("/post")
def club_create_post(post: Post, data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "club":
            supabase.table("posts").insert({
                "post_title": post.post_title,
                "post_body": post.post_body,
                "post_expiray_date": post.post_expiray_date,
                "posted_by": data["user_id"]
            }).execute()
        
        else:
            raise HTTPException(status_code=401, detail="Unauthorized Access")
    
    except HTTPException as he:
        raise he
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return {"msg": "Post Created Successfully"}

# Endpoint for retrieving all posts for club users, ensuring proper role authorization.
@router.get("/post")
def club_read_posts(data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "club":
            response = supabase.table("posts").select("*, user_to_role(user_name)").eq("posted_by", data["user_id"]).execute()
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
    
    return {"data":response.data}

# Endpoint for retrieving a post for clubs, ensuring proper role authorization.
@router.get("/post/{id}")
def club_read_post(id: str, data: dict[str, Any] = Depends(get_current_user)):
    try:
        if data["role"] == "club":
            response = supabase.table("posts").select("*, user_to_role(user_name)").eq("post_id", id).eq("posted_by", data["user_id"]).execute()
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
    
    return {"data":response.data}