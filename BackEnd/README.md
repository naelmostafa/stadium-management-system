# Backend for the stadium management system

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup

1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a Database in PostgreSQL using pgAdmin or the command line.
4. Run database.sql (Database Design/database.sql) in the database to create the tables.
5. copy .env.example to .env and add the following variables:

    ``` env
    PORT=3000
    DB_USERNAME=your_user
    DB_PASSWORD=your_password
    DB_DATABASE=your_database
    DB_HOST=your_host
    DB_DIALECT=postgres
    ```

6. Run `npm start` to start the server.

## Usage

### Endpoints

#### Customers

##### Login
``` bash
POST /customers/login
```
Request Body:
``` json
{
    "email": "",
    "password": ""
}
```
Response Body On success:
``` json
{
    "id": 1,
    "email": ""
    "name": "",
    ...all other customer fields
}
```

##### Register
``` bash
POST /customers/register
```
Request Body:
``` json
{
    "email": "",
    "password": "",
    "name": "",
    "phone": ""
}
```
Response Body On success:
``` json
{
    "id": 1,
    "email": "",
    "name": "",
    ...all other customer fields
}
```
##### Update customer data (TODO)


#### Stadium 
##### Get Availble stadiums in the given date and time
```bash
GET /stadiums/availbe-stadiums?reservation_date=2023-01-01&reservation_time=18:00
```
No body in request

Response Body On success:
``` json
{
    "id": 1,
    "size": "",
    "description": "",
    ...all other stadium fields
}
```

##### Add new Stdiums (TODO: Authentication)
```bash
POST /stadiums/add
```

Request Body:
``` json
{
    "name":"",
    "size": "",
    "description": "",
    ...all other stadium fields
}
```

Response Body On success:
``` json
{
    "id": 1
    "name":"",
    "size": "",
    "description": "",
    ...all other stadium fields
}
```

