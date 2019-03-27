# Router

## Description

Router a platform where users can search or publish travel ideas and find people to share experiences

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start booking or creating trips
-  **Login:** As a user I can login to the platform so that I can see my trips and messages
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Trip** As a user I can add a trip so that I can share it with other users
-  **List trips** As a user I want to see the trips that are available so that I can choose one and share the experience
-  **Search trips** As a user I want to search trips by cities and see the trips availables for my search
-  **Make an activity request** As a user I want to have sugestions of activities and make an request to the owner of the trip
-  **Book a trip** As a user I want to book the trip that i like so i can pay and share the experience
-  **See profile** As a user i want to be able to see others travelers profile so i can have an idea of who is the people i'm going to travel with.
-  **Messages** As a user i want to check the messages and the request i have so i can response

## Backlog

Blog:
- create a blog where user can share experiences and pictures of the travels they've made

Geo Location:
- Show a map with the route from start to end

Payment:
- Add a payment method inside the app

User Califications:
- Add a puntuation system for users

Activities Request:
- As a user I want to have sugestions of activities and make an request to the owner of the trip


# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| public | just promotional copy|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to publish or find travels page|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to profile after login |
| `post` | `/auth/logout` | n/a| known only | navigate to homepage after logout, expire session |
| `get`  | `/travels` | TravelsCategoriesPageComponent| public | shows all travel categories, links to travels availables for that category |
| `get`  | `/travels/category` | TravelsListComponent | public | Show all travel for that category | links to detail |
| `post` | `/travels` | TravelCreatePageComponent | user only | creates a new travlr, navigates to travel detail |
| `get` | `/travels/:id` | TravelDetailPageComponent  | public/user | details of one travel, if logged in - button to add to book if not owner, button to edit or delete if owner|
| `put` | `/travels/:id` | TravelDetailPageComponent | CreateTravelComponentForm | Ownwer only | details of one travel 
| `delete` | `/travels/:id` | na | owner only | delete travel
| `get` | `/profile/me` | ProfilePageComponent | user only | my details, my travels, travels i've done
| `get` | `**` | NotFoundPageComponent | public | 




## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Travels Service
  - Travels.list()
  - Travels.search(terms)
  - Travels.create(data)
  - Travels.detail(id)
  - Travels.book(id)
  - Travels.delete(id)   

# Server

## Models

User model

```
username - String // required
password - String // required

```

Travels model

```
owner - ObjectID<User> // required
name - String // required
description - Sring // required
activities - Array // required
start point - String // required
end point - String // required
available seats - Number // required
attendies - Array ref: user
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- POST /user/me/travels
  - body:
    - travelId
  - validation
    - id is valid (404)
    - id exists (404)
  - Edit travel
  - Delete travel
- DELETE /user/me/travels/:travelId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from travels
  - updates user in session
- GET /travels?terms=foo
  - use search criteria if terms provided
  - 200 with array of travels
- POST /travel
  - body:    
    - name 
    - description 
    - activities 
    - start point 
    - end point 
    - attendies 
    - Seats availbles  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

[Client repository Link](https://github.com/adrivpp/Router-frontend)
[Server repository Link](https://github.com/adrivpp/Roter-backend)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
