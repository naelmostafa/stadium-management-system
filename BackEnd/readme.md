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

6. Create a database.json file in the root directory of the project and add the following variables:

    ``` json
    {
      "dev": {
        "username": "your_user",
        "password": "your_password",
        "database": "your_database",
        "host": "your_host",
        "dialect": "postgres"
      },
        "test": {
            "username": "your_user",
            "password": "your_password",
            "database": "your_database",
            "host": "your_host",
            "dialect": "postgres"
        },
    }
    ```

7. Run `npm start` to start the server.

## Usage

### Endpoints

To be added later.
