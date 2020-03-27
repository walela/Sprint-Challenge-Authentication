const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('./auth-model')

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: 60 * 60
  }

  return jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', options)
}

const validateCredentials = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    res
      .status(400)
      .json({ message: 'Error. Both username and password required' })
  } else {
    next()
  }
}

router.post('/register', validateCredentials, (req, res) => {
  const { username, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  db.add({ username, password: hashedPassword })
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.post('/login', validateCredentials, (req, res) => {
  const { username, password } = req.body

  db.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials. Try again' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(401).json({ message: err.message }) // funky {}
    })
})

module.exports = router
