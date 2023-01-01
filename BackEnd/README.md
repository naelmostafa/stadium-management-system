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
    "status": 200,
    "message": "Loged in successfully",
    "data": {
        "id": 4,
        "name": "omar",
        "email": "test@test.com",
        "phone_number": "01234567",
        "profile_picture": null,
        "balance": 0
    }
}
```

##### Register

``` bash
POST /customers/register
```

Request Body:

``` json

{
    "email":"test@test.com",
    "name":"omar",
    "password":"1234567",
    "phone":"0123456"
}

```

Response Body On success:

``` json
{
    "status": 200,
    "message": "Customer created successfully",
    "data" : {
    "email":"test@test.com",
    "name":"omar",
    "password":"1234567",
    "phone":"0123456"
}
}
```

##### Update customer data (TODO)

#### Stadium

##### Get all stadiums

```bash
GET /stadium/all
```

No body in request
Response

```json
{
    "status": 200,
    "message": "stadiums fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "stadium 1",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        },
        {
            "id": 2,
            "name": "stadium 2",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        }
    ]
}
```

##### Get Availble stadiums in the given date and time

```bash
GET /stadium/available-stadiums?reservation_date=2023-01-01&start_time=18:00&end_time=20:00
```

No body in request

Response Body On success:

``` json
{
    "status": 200,
    "message": "stadiums fetched successfully",
    "data": [
        {
            "id": 2,
            "name": "stadium 1",
            "description": "Beautiful stadium",
            "size": 5,
            "cost_per_hour": 200,
            "location": "Smouha,Alexandria",
            "photo": null,
            "stadium_number": 2,
            "status": "available"
        }
    ]
}
```

##### Add new Stdiums (TODO: Authentication)

```bash
POST /stadiums/add
```

Request Body:

``` json
{
    "name":"stadium 1",
    "description":"Beautiful stadium",
    "size":5,
    "location":"Smouha,Alexandria",
    "cost_per_hour":200,
    "stadium_number":2,
    "status":"available"
}
```

Response Body On success:

``` json
{
    "status": 200,
    "message": "stadiums fetched successfully",
    "data": {
        "id": 1,
        "name": "stadium 1",
        "description": "Beautiful stadium",
        "size": 5,
        "cost_per_hour": 200,
        "location": "Smouha,Alexandria",
        "photo": null,
        "stadium_number": 2,
        "status": "available"
    }
}
```

##### Update Stadium (TODO: Authentication)

```bash
PUT /stadium/update
```

Request

``` json
{
    "id": 1,
    "name":"stadium 1",
    "description":"Beautiful stadium",
    "size":5,
    "location":"Smouha,Alexandria",
    "cost_per_hour":250,
    "stadium_number":2,
    "status":"available"
}
```

Response on success

```json
{
    "status": 200,
    "message": "stadium updated successfully",
    "data": {
        "id": 1,
        "name": "stadium 1",
        "description": "Beautiful stadium",
        "size": 5,
        "cost_per_hour": 250,
        "location": "Smouha,Alexandria",
        "photo": null,
        "stadium_number": 2,
        "status": "available"
    }
}
```

#### Reservations

##### Add new reservation

```bash
POST /reservation/add
```

Request Body:

``` json
{
    "customer_id":4,
    "date": "2023-01-01",
    "start_time" : "22:00",
    "end_time":"00:00",
    "stadium_id" : 2,
    "deposit" : 50,
    "total_price":400,
    "payment_method":"visa"

}
```

Response Body On success:

``` json
{
    "status": 201,
    "message": "Reservation added successfully",
    "data": {
        "id": 4,
        "customer_id": 4,
        "date": "2023-01-01",
        "start_time": "22:00:00",
        "end_time": "00:00:00",
        "stadium_id": 2,
        "deposit": 50,
        "total_price": 400,
        "payment_method": "visa"
    }
}
```

##### Get all reservations

```bash
GET /reservations/all
```

No body in request
Response on success

```json
{
    "status": 200,
    "message": "reservations fetched successfully",
    "data": [
        {
            "id": 7,
            "customer_id": 4,
            "date": "2023-01-02",
            "start_time": "22:00:00",
            "end_time": "00:00:00",
            "stadium_id": 2,
            "deposit": 50,
            "total_price": 400,
            "payment_method": "visa"
        },
        {
            "id": 8,
            "customer_id": 4,
            "date": "2023-01-01",
            "start_time": "22:00:00",
            "end_time": "00:00:00",
            "stadium_id": 2,
            "deposit": 50,
            "total_price": 400,
            "payment_method": "visa"
        }
    ]
}
```

##### Update reservation (TODO: Authentication)

```bash
PUT /reservation/:reservation_id/update
```
