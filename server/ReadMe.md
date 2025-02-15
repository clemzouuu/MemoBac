# MemoBac API

## Requirements

Make sure to have the following tools installed on your machine.
- Docker
- Postman (to test the server without the front-end)

---
## Step 1: Clone the repository
```shell  
git clone https://github.com/clemzouuu/MemoBac.git
```  

## Step 2: Run the Server

1. **Create and start a MySQL Database** (it will work with the server)
```shell  
docker-compose up --build  
```  
2. **Install the dependencies** (in a new terminal)
```shell  
npm install  
```
3. **Start the development server**
```shell  
npm run dev  
```
4. **Done!** The API is now running on [http://localhost:8080](http://localhost:8080)  
   For now, the database is empty. You can start by registering and creating a card.

---

## Step 2: Play with the API

The easiest way to send HTTP requests to the server is to use Postman


## Step 2.1: Register

In order to send requests to the API, you must authenticate yourself.

- Request
```curl
POST http://localhost:8080/auth/register
```

- Body
```json
{
    "username": "john",
    "password": "123"
}
```

- Token: none

---

## Step 2.2: Login

- Request
```curl
POST http://localhost:8080/auth/login
```

- Body
```json
{
    "username": "john",
    "password": "123"
}
```

- Token: none

IMPORTANT! Make sure to note down the token returned by the API, you will need it for all your requests.

---

## Step 2.3: Create a new card

- Request
```curl
POST http://localhost:8080/cards
```

- Body
```json
{
    "question": "What is life?",
    "answer": "When something moves",
    "tag": "life"
}
```

- Token: required ( = the token returned when logged in)

---

## Step 2.4: Retrieve all cards

- Request
```curl
GET http://localhost:8080/cards
```

- Token: required

---

## Step 2.5: Get cards by tag

- Request
```curl
GET http://localhost:8080/cards/tags/life
```

- Token: required

---

## Step 2.6: Update a card’s tag

- Request
```curl
PATCH http://localhost:8080/cards/{cardId}/tag
```

Example:
```curl
PATCH http://localhost:8080/cards/a98516dd-22ae-477c-a379-faf89c9656d6/tag
```

- Token: required

---

## Step 2.7: Start a quiz

- Request
```curl
GET http://localhost:8080/cards/quizz
```

- Token: required

---

## Step 2.8: Answer a card (Wrong answer)

- Request
```curl
PATCH http://localhost:8080/cards/{cardId}/answer
```

Example:
```curl
PATCH http://localhost:8080/cards/a98516dd-22ae-477c-a379-faf89c9656d6/answer
```

- Body
```json
{ "isValid": false }
```

- Token: required

---

## Step 2.9: Answer a card (Correct answer)

- Request
```curl
PATCH http://localhost:8080/cards/{cardId}/answer
```

Example:
```curl
PATCH http://localhost:8080/cards/a98516dd-22ae-477c-a379-faf89c9656d6/answer
```

- Body
```json
{ "isValid": true }
```

- Token: required



--- 

## Error Handling
- **Custom error middleware** is used to handle errors and send appropriate responses.

## Database
- **MySQL** is used as the database.
- **TypeORM** is used for database interactions.

## Development
- **TypeScript** is used for development.
- **Nodemon** is used for automatic server restarts during development.