# Beauty Web project

Beauty Web project built using React and Node.js.

## Features
- **Login
- **Registartion
- **Create Procedures**: Admin can create procedures.
- **Delete Procedures**: Admin can delete procedures.
- **Edit Procedures**: Admin can edit procedures.
- **Create Procedure time**: Admin can create procedure times.


## Technologies Used

- React
- Node.js
- Express
- PostgreSQL
- Styled Components

## Setup Instructions

1. Clone the repository from github:
   https://github.com/albertoviciute/beautyWebTechin
2. Open terminal on VSCODE and run command:
   ```
   git clone https://github.com/albertoviciute/beautyWebTechin
   ```
4. Setup database in ProgreSQL
5. Run commands in database
```
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	registered_on DATE NOT NULL,
	role VARCHAR(255) NOT NULL DEFAULT 'user'
);
 
CREATE TABLE Procedures (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   category VARCHAR(255) NOT NULL,
   duration  VARCHAR(50) NOT NULL,
   image VARCHAR(255),
   price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE procedure_visits (
    visit_id SERIAL PRIMARY KEY,
    procedure_id INTEGER NOT NULL,
    date_time DATE NOT NULL,
    start_time TIME NOT NULL,
    CONSTRAINT fk_procedure_id FOREIGN KEY (procedure_id) REFERENCES procedures(id)
);

```

5. Install packagess in server and client
 ```
cd client 
npm run dev
cd ../server
npm run dev
```
6. Add .env file to main folder and paste this
```
# Database Configuration Variables
DB_USER=postgres
DB_HOST=localhost
DB_NAME=testas
DB_PASSWORD=albertoviciute

# Server Configuration Variable
PORT=1000

# JWT Configuration Variable
JWT_SECRET=myjwtsecretkey
```
7. Run servers
 
```
cd client
npm run dev
cd ../server
npm run dev
```
