<<<<<<< HEAD
# Finex-FinancialExchange
=======
# Project Name
finex - financial Exchange

## Description
 The app provides features such as user login, viewing user information and transaction history, transferring money between accounts, and an admin role for managing user details and their transaction history. To handle concurrent transactions, a table lock mechanism is implemented.

 ## Features
1- User Login: Secure user authentication.
2- User Information: View account details and balance.
3- Transaction History: Access past transaction history.
4- Money Transfer: Transfer money between user accounts.
Admin Role:
1- View and manage all users' information.
2- Access the transaction history of all users.
3- Concurrency Handling: Locking mechanism for handling concurrent transactions.

## Tech Stack
Frontend: ReactJS,Primereact
Backend: NestJS (Node.js framework)
Database: PostgreSQL,TypeORM

## Installation
1- Prerequisites

Node.js
PostgreSQL database

2- Steps
1 Clone the Repository

## Backend Setup (NestJS):
Navigate to the server folder:
cd server
npm install
Database Setup:

Create a new PostgreSQL database.
Inside the server/database folder, you'll find a .sql file containing queries to insert user and admin data and create database

Run the Backend:
npm run start:dev

This will create the required database entities and tables.

## Frontend Setup (ReactJS):
Navigate to the client folder:
cd ../client
npm install
Environment Variables:

Create a .env file in the client directory.
Copy the contents of .env.example and adjust the values for your environment.
npm start

Usage
Login: Users can log in with valid credentials.
Check User Info: View account balance and details.
Transaction History: View past transactions.
Transfer Money: Users can transfer money between accounts.
Admin: Admins can view and manage all users and their transaction history.

>>>>>>> 7762ee3d6f3774bf3b984c0af8f7953ba2967f7a
