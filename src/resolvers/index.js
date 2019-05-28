const userMutations = require('./mutations/user')
const expenseMutations = require('./mutations/expense')

const Expense = require('./Expense')
const User = require('./User')

const Query = require('./query')

module.exports = {
  Query,
  Mutation: { ...expenseMutations, ...userMutations },
  Expense,
  User
}
