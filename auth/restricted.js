const jwt = require('jsonwebtoken')
const mysecret = require('./secret')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    jwt.verify(authorization, mysecret, (err, token) => {
      if (err) {
        res.status(401).json({ message: 'Invalid authorization' })
      } else {
        req.token = token
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No authorization provided' })
  }
}