# Expenses API

This is an API made for the Expenses App, made with React Native. The repository of this app can be found here: https://github.com/rodriigovieira/rn-challenge-2

This is an API made with GraphQL and Prisma, and it features the following:
- Authentication system
- Users and Expenses, where only the creators can see their expenses
- Apollo-server and Prisma already configured
- All CRUD operations for Users and Expenses
- Work In Progress -> Recover Password Feature

# Live Preview

This project is hosted on Heroku, and if you'd like, you can simply access it's live preview.

The project is available at: https://rn-expenses-backend.herokuapp.com/

# Installation

If you'd like to install this project locally, simply follow these steps:

### 1. Make sure your environment is ready.

For this project, the only things you need to have installed locally are Prisma and NodeJS.

If you already have NodeJS installed, to install yarn simply run `npm -g install yarn`.

### 2. Clone this repository

Execute this command:

```
git clone https://github.com/rodriigovieira/expenses-api.git  
```

### 3. Switch to the project directory

After you clone the project, you have to switch to the project's directory. To do this, simply run:

```
cd expenses-api
```

### 4. Install all dependencies

Before you can run this project locally, you need all dependencies installed.

To do that, simply run:

```
yarn
```

### 5. Configure the environment variables

This project uses JSON Web Token, and you need to specifiy an environment variable in order for this library to work.

To do this, simply create a `.env` file in the root folder of the project, and set the environment variable `JWT_SECRET` to something big. Any number and/or letter will do.

If this seems too complicated, you can simply run the following command: (make sure you are in the root directory of the project, not in `/src` nor anywhere else)

```
echo "JWT_SECRET=you_can_specify_your_secret_jwt_key_here" >> .env
```

This command will create a `.env` file for you, and will paste the environment variable.

Even though the command will work if you execute it without changing the `JWT_SECRET` value, it's strongly advised that you set a different and custom secret.

### 6 Start the project

Finally!

To start the project, run:

```
yarn start
```

This command will configure all environment variables and then start the server.

By default, the server will be executed at port 4000.
