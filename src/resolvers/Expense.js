const getUserId = require('../utils/getUserId')

const Expense = {
  author: async (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    const user = await prisma.user({ id: userId })

    return user
  }
}

module.exports = Expense
