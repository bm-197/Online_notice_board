import os
from dotenv import load_dotenv
from fastapi import FastAPI, Header
from pydantic import BaseModel
from supabase import create_client, Client
from fastapi.middleware.cors import CORSMiddleware

# 

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()

'''
We have two database 

user_to_role database
id, Role, created_at	

posts databse
post_id, post_title, post_body, post_expiray_date, created_at, posted_by	
'''

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Form thingy when sign up user
class signup_user(BaseModel):
    email: str
    password: str
    role: str

# Form thingy when sign in user
class signin_user(BaseModel):
    email: str
    password: str

# Form thingy when post
class post(BaseModel):
    post_title: str
    post_body: str
    post_expiray_date: str

# Auth
# =======================================================================================================
# Sign up
@app.post("/signup")
def sign_up(users: signup_user):
    # Signing up using user name and password
    try:
        response = supabase.auth.sign_up(
            {"email": users.email, "password": users.password}
        )
        
        response = supabase.auth.get_user()
        user_id = response.user.id
    
        # insert data to know the role
        response = (
            supabase.table("user_to_role")
            .insert({"id": user_id, "Role": users.role})
            .execute()
        )

        return {"sucess":"yes", "user_id":user_id, "Role":users.role}        
    except Exception as e:
        return {"sucess":"no", "error":e}


# Sign in
@app.post("/signin")
def sign_in(users:signin_user):
    # signing in here
    try:
        response = supabase.auth.sign_in_with_password(
        {"email": users.email, "password": users.password}
        )

        response = supabase.auth.get_user()
        user_id = response.user.id
        print(user_id)

        response = (supabase 
            .from_("user_to_role") 
            .select("Role") 
            .eq("id", user_id) 
            .execute())
        

        global role
        global email

        email = users.email
        role = response.data[0]["Role"]

        return {"sucess":"yes", "role": role, "user_id":user_id}
    except Exception as e:
        return {"sucess":"no","error":e}

# =======================================================================================================
# Admin prevliage
@app.post("/admin/post")
def admin_make_post(posts: post, role: str = Header(None)):
    if role == "admin":
        try:
            response = (
                supabase.table("posts")
                .insert({"post_title": posts.post_title, "post_body": posts.post_body, "post_expiray_date":None, "posted_by":email})  # edit expriey date for running pupose only
                .execute()
            )

            return {"sucess":"yes"}
        except Exception as e:
            return {"sucess":"no","error":e}


@app.get("/admin/read")
def admin_read_post():
    print(role)
    if role == "admin":
        try:
            response = (supabase 
                .from_("posts") 
                .select("*") 
                .execute())
            return {"sucess":"yes", "data":response.data}
            
        except Exception as e:
            return {"sucess":"no","error":e}
        
# =======================================================================================================
# Club previlage
@app.post("/club/post")
def club_post(posts: post):
    if role == "club":
        try:
            response = (
                supabase.table("posts")
                .insert({"post_title": posts.post_title, "post_body": posts.post_body, "post_expiray_date":None, "posted_by":email}) # edit expriey date for running pupose only
                .execute()
            )

            return {"sucess":"yes"}
        except Exception as e:
            return {"sucess":"no","error":e}

@app.get("/club/read")
def club_read():
   if role == "club":
        try:
            response = (supabase 
                .from_("posts") 
                .select("*")
                .eq("posted_by", email) 
                .execute())
            return {"sucess":"yes", "data":response.data}
            
        except Exception as e:
            return {"sucess":"no","error":e}

# =======================================================================================================
# Studenet previlage
@app.get("/student/read")
def student_read():
    if role == "student":
        try:
            response = (supabase 
                .from_("posts") 
                .select("post_title, post_body") 
                .execute())
            return {"sucess":"yes", "data":response.data}      
        except Exception as e:
            return {"sucess":"no","error":e}

