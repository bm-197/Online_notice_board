from fastapi import APIRouter, Header
from ..Models.schemas import Post
from ..Database.supabase import supabase

router = APIRouter()

# Endpoint for administrators to create a new post, ensuring proper role authorization.
@router.post("/post")
def admin_make_post(post: Post, role: str = Header(None)):
    if role == "admin":
        try:
            supabase.table("posts").insert({
                "post_title": post.post_title,
                "post_body": post.post_body,
                "post_expiray_date": post.post_expiray_date,
                "posted_by": "admin"
            }).execute()
            return {"success": "yes"}
        except Exception as e:
            return {"success": "no", "error": str(e)}
    return {"success": "no", "error": "Unauthorized"}

# Endpoint for administrators to retrieve all posts, ensuring proper role authorization.
@router.get("/read")
def admin_read_posts(role: str = Header(None)):
    if role == "admin":
        try:
            response = supabase.table("posts").select("*").execute()
            return {"success": "yes", "data": response.data}
        except Exception as e:
            return {"success": "no", "error": str(e)}
    return {"success": "no", "error": "Unauthorized"}
