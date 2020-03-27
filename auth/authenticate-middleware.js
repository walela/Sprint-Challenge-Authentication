const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = process.env.JWT_SECRET || 'defaultsecret'

  if (token) {
    jwt.verify(token, secret, (err, decodedUser) => {
      if (err) {
        res.status(400).json({ message: 'bad token' })
      } else {
        req.loggedInUser = decodedUser
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'no credentials provided' })
  }
}
