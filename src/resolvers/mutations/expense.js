const getUserId = require('../../utils/getUserId')

const expense = {
  createExpense: async (parent, { data }, { prisma, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('You must be authenticated.')

    const createdExpense = await prisma.createExpense({
      name: data.name,
      value: data.value,
      type: data.type,
      description: data.description,
      author: { connect: { id: userId } }
    })

    if (!createdExpense) throw new Error('Expense was not created.')

    return createdExpense
  },

  updateExpense: async (parent, args, { prisma }) => {
    const updatedExpense = await prisma.updateExpense({
      where: { id: args.id },
      data: { ...args.data }
    })

    if (!updatedExpense) throw new Error(`Expense with id ${args.id} was not found.`)

    return updatedExpense
  },

  deleteExpense: async (parent, args, { prisma }) => {
    const deletedExpense = await prisma.deleteExpense({ id: args.id })

    if (!deletedExpense) throw new Error(`Expense with id ${args.id} was not found.`)

    return deletedExpense
  }
}

module.exports = expense
