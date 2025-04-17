 Social Network API
This is a back-end application for a social network platform where users can share their thoughts, react to friends’ thoughts, and manage a list of friends. Built using TypeScript, Express, and MongoDB with Mongoose.

Table of Contents
Features

Technologies

Installation

Usage

API Routes

Demo

License

 Features
Create, Read, Update, and Delete Users

Create, Read, Update, and Delete Thoughts

Add/Remove Friends from user profiles

Add/Remove Reactions to thoughts

Uses Mongoose virtuals and getters for computed properties and formatted timestamps

Clean structure using TypeScript and MVC architecture

 Technologies
TypeScript

Node.js

Express.js

MongoDB

Mongoose

RESTful APIs

 Installation
1. Clone the repo

bash
git clone https://github.com/your-username/social-network-api.git
cd social-network-api

2. Install dependencies

bash
npm install

3. Start MongoDB (Make sure MongoDB is running locally)

4. Start the server

bash

npm run build
npm start


 Usage
Use a tool like Insomnia, Postman, or Thunder Client to test the API routes.

Base URL: http://localhost:3001/api

📘 API Routes
Users:
GET /api/users – Get all users

GET /api/users/:userId – Get a single user

POST /api/users – Create a user

PUT /api/users/:userId – Update a user

DELETE /api/users/:userId – Delete a user

POST /api/users/:userId/friends/:friendId – Add a friend

DELETE /api/users/:userId/friends/:friendId – Remove a friend

Thoughts:
GET /api/thoughts – Get all thoughts

GET /api/thoughts/:thoughtId – Get a single thought

POST /api/thoughts – Create a thought

PUT /api/thoughts/:thoughtId – Update a thought

DELETE /api/thoughts/:thoughtId – Delete a thought

POST /api/thoughts/:thoughtId/reactions – Add a reaction

DELETE /api/thoughts/:thoughtId/reactions/:reactionId – Remove a reaction

📹 Demo
https://www.loom.com/share/079c3ec184c14576900d524e310a0e56?sid=67ad70d5-e11d-41ae-a12c-37b870f043e9
📄 License
This project is licensed under the MIT License.
