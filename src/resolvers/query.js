const getUserId = require('../utils/getUserId')

const Query = {
  showAllExpenses: async (parent, args, { prisma }) =>
  // const expenses = await prisma.expenses()

    // return expenses
    [],

  showAllUsers: async (parent, args, { prisma }) =>
  // const users = await prisma.users()

    // return users
    [],

  showExpense: async (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('You must be authenticated.')

    const expense = await prisma.expense({ id: args.id })

    return expense
  },

  showUser: async (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('You must be authenticated.')

    const user = await prisma.user({ id: args.id })

    return user
  },

  showUserExpenses: async (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('You must be authenticated.')

    const userExpenses = await prisma.user({ id: userId }).expenses()

    return userExpenses
  }
}

module.exports = Query
