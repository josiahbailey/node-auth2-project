const router = require('express').Router()

const Users = require('./users-model')

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({ message: 'Error fetching users' })
    })
})

module.exports = router