const jwt = require('jsonwebtoken')

// Return the user ID by checking if the authorization key
// in the headers section is valid. If, however, the password
// is invalid, then null will be returned. By default,
// authentication is required.

const getUserId = (request, requireAuth = true) => {
  const Authorization = request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')

    return jwt.verify(token, process.env.JWT_SECRET).userId
  }

  if (requireAuth) throw new Error('You need to be logged in.')

  return null
}

module.exports = getUserId
