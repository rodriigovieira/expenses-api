const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    expenses: [Expense!]!
  }

  type Expense {
    id: ID!
    name: String!
    description: String!
    value: Float!
    type: ExpenseType!
    author: User!
  }

  enum ExpenseType {
    POSITIVE
    NEGATIVE
  }

  type Query {
    showAllExpenses: [Expense!]!
    showAllUsers: [User!]!
    showExpense(id: ID!): Expense!
    showUser(id: ID!): User!
    showUserExpenses: [Expense!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): AuthPayload!
    loginUser(data: LoginUserInput!): AuthPayload!
    triggerPasswordReset(email: String!): ID
    resetPassword(password: String!): User
    updateUser(data: UpdateUserInput!, id: ID!): User!
    deleteUser(id: ID!): User!

    createExpense(data: CreateExpenseInput!): Expense!
    updateExpense(data: UpdateExpenseInput!, id: ID!): Expense!
    deleteExpense(id: ID!): Expense!
  }

  input CreateExpenseInput {
    name: String!
    description: String!
    value: Float!
    type: ExpenseType!
    author: ID!
  }

  input UpdateExpenseInput {
    name: String
    value: Float
    type: ExpenseType
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`

module.exports = typeDefs
