# API Documentation

## User Management
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/users/me - Get current user profile

PUT /api/users/me - Update profile

GET /api/users (admin only) - List all users

PUT/DELETE /api/users/:id (admin only) - Manage users


## Poll Management
POST /api/polls (admin) - Create poll

GET /api/polls - List all polls (paginated)

GET /api/polls/:id - Get poll details

PUT /api/polls/:id (admin) - Update poll

DELETE /api/polls/:id (admin) - Delete poll

POST /api/polls/:id/lock (admin) - Lock poll

POST /api/polls/:id/unlock (admin) - Unlock poll

POST /api/polls/:id/options (admin) - Add option

DELETE /api/polls/:id/options/:optionId (admin) - Remove option


## Vote Management
POST /api/polls/:id/vote - Vote on an option

POST /api/polls/:id/unvote - Remove vote 
// hihihi