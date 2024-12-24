from fastapi import APIRouter, Header
from Database.supabase import supabase

router = APIRouter()

# Endpoint for retrieving all posts for student users, ensuring proper role authorization.
@router.get("/read")
def student_read_posts(role: str = Header(None)):
    if role == "student":
        try:
            response = supabase.table("posts").select("*").execute()
            return {"success": "yes", "data": response.data}
        except Exception as e:
            return {"success": "no", "error": str(e)}
    return {"success": "no", "error": "Unauthorized"}
