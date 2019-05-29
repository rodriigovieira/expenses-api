const bcrypt = require('bcryptjs')

const generateToken = require('../../utils/generateToken')
const hashPassword = require('../../utils/hashPassword')
const getUserId = require('../../utils/getUserId')
const sgMail = require('../../utils/emailConfig')

const auth = {
  createUser: async (parent, { data }, { request, prisma }) => {
    // It'll be verified if the password is longer
    // than 8 characters and if the email exists.
    const exists = await prisma.$exists.user({ email: data.email })

    if (exists) throw new Error(`User with email ${data.email} already exists.`)

    const password = await hashPassword(data.password)

    const user = await prisma.createUser({ ...data, password })

    return {
      token: generateToken(user.id),
      user
    }
  },

  loginUser: async (parent, { data }, { prisma }) => {
    const user = await prisma.user({ email: data.email })

    if (!user) throw new Error(`No user found for email: ${data.email}.`)

    const passwordValid = await bcrypt.compare(data.password, user.password)

    if (!passwordValid) throw new Error('Invalid password.')

    return {
      token: generateToken(user.id),
      user
    }
  },

  triggerPasswordReset: async (parent, { email }, { prisma }) => {
    const user = await prisma.user({ email })

    if (!user) throw new Error('No user with this email.')

    const emailContent = {
      from: 'admin@rodrigovieira.work',
      to: email,
      subject: 'Password Recovery Expenses App',
      html: `
        <h1><center>Password Recovery Expenses App</center></h1>

        <p>
          You are receiving this email because the password recovery form in the Expenses App system was filled.
        </p><br/>

        <p>
         To recover your password, <a href="https://rn-expenses-backend.herokuapp.com/recover/${generateToken(
    user.id
  )}"><strong>click here</strong></a> and follow the provided steps.
  PS: You must be on your mobile phone in order for this to work.
        </p><br/>

        <p>
          If the button above does not work, you can copy this URL: https://rn-expenses-backend.herokuapp.com/recover/${generateToken(
    user.id
  )} and paste it into Safari.
        </p>
      `
    }

    sgMail.send(emailContent)

    return null
  },

  resetPassword: async (parent, args, { prisma, request }) => {
    const userId = getUserId(request)

    if (!userId) throw new Error('No user logged in.')
    if (!args.password) throw new Error('Password is necessary.')

    const password = await hashPassword(args.password)

    return prisma.updateUser({
      where: { id: userId },
      data: { password }
    })
  },

  updateUser: async (parent, args, { prisma, request }) => {
    // Will update user, including user password
    // by re-hashing it. User authenticated has to
    // own the user that he's updating.

    const userId = getUserId(request)

    const isOwner = args.id === userId

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    if (!userId || !isOwner) throw new Error('You are not authorized.')

    return prisma.updateUser({
      where: { id: args.id },
      data: args.data
    })
  },

  deleteUser: async (parent, { id }, { prisma, request }) => {
    // Delete the user, verifying if it exists.

    const userId = getUserId(request)

    const exists = await prisma.$exists.user({ id })

    if (!userId) throw new Error('You have to be authenticated.')
    if (!exists) throw new Error('User with provided ID does not exists.')

    return prisma.deleteUser({ id })
  }
}

module.exports = auth
