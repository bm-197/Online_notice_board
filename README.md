# Online-Notice-Board
This project is an online notice board application built using FastAPI, Supabase, and Pydantic for managing user authentication, roles, and posts. It allows users to sign up, sign in, and view or create posts based on their assigned roles (Admin, Club, Student). The app supports role-based access control to ensure that users can interact with the platform according to their permissions.

## Features
- User authentication and role management (Admin, Club, Student).
- Admins can create and view posts.
- Club users can create posts and view them.
- Students can view posts.
- Role-based access control for secure interactions.

## Technologies Used
- **FastAPI** for backend API development.
- **Supabase** for database and authentication services.
- **Pydantic** for schema validation.

## Setup
1. Clone the repository.
2. Set up a Supabase project and configure API keys.
3. Install the required dependencies: `pip install -r requirements.txt`.
4. Run the FastAPI app: `uvicorn main:app --reload`.
