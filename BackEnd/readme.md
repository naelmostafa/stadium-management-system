# Backend for the stadium management system

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Setup

1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a Database in PostgreSQL using pgAdmin or the command line.
4. Run database.sql (Databse Design/database.sql) in the database to create the tables.
5. Create a .env file in the root directory of the project and add the following variables:

```
POSTGRES_HOST=your_host
POSTGRES_DB=your_database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_PORT=your_port
```
6. Create a database.json file in the root directory of the project and add the following variables:

```
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