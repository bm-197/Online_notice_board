# File made to handle schemas and what the format has to look like
from pydantic import BaseModel
from typing import Optional

# Pydantic BaseModel for handling user sign-up information
class SignupUser(BaseModel):
    email: str
    password: str
    role: str

# Pydantic BaseModel for handling user sign-in information
class SigninUser(BaseModel):
    email: str
    password: str

class SignupClub(BaseModel):
    name: str
    email: str
    password: str

# Pydantic BaseModel for handling user Post information
class Post(BaseModel):
    post_title: str
    post_body: str
    post_expiray_date: Optional[str] = None
