const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const mysecret = require('./secret')

const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  const newUser = req.body
  const { username, password, department } = newUser
  newUser.password = bcrypt.hashSync(password, 12)

  if (newUser && username && password && department) {
    Users.add(newUser)
      .then(user => {
        res.status(201).json({ message: `Successfully registered user ${user.username}`, user: user })
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    res.status(401).json({ message: 'User must contain username, password, and department' })
  }
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const secret = mysecret
    const options = {
      expiresIn: '1d'
    }
    console.log('Working')
    return jwt.sign(payload, secret, options)
  }

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token and send to client
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${username}!`, token: token })
      } else {
        res.status(401).json({ message: `Invalid username or password` })
      }
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router