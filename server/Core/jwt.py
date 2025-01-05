from jose import jwt, JWTError
from fastapi import Request, HTTPException
from datetime import datetime, timedelta
from ..Core.config import JWT_SECRET_KEY
from typing import Any

def create_token(data: dict, delta: int = 60) -> str:
    try:
        to_encode = data.copy()
        exp = datetime.utcnow() + timedelta(minutes=delta)
        to_encode.update({"exp": exp})
    
        token = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm="HS256")
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return token

def get_current_user(req: Request) -> dict[str, Any]:
    try:
        token = req.headers.get("Authorization", None)

        if token is None:
            raise HTTPException(status_code=400, detail="Authorization header missing")

        # The token should be in the format "Bearer <token>"
        token = token.split(" ")[1] if " " in token else None

        if token is None:
            raise HTTPException(status_code=400, detail="Invalid Authorization header format")
        
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        
        user_id = payload.get("user_id")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid Token")
    
    except HTTPException as he:
        print(f"error: {he}")
        raise he
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    
    except JWTError as je:
        print(f"error while decoding jwt: {je}")
        raise HTTPException(status_code=401, detail="Invalide Token")
        
    except Exception as e:
        print(f"error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    return payload