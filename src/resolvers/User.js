const User = {
  expenses: async (parent, args, { prisma }) => {
    const expenses = prisma.user({ id: parent.id }).expenses()

    return expenses
  }
}

module.exports = User
