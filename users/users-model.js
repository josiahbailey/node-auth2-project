const db = require('../data/db-config')

module.exports = {
  get,
  getBy,
  add
}

function get() {
  return db('users')
}

function getBy(filter) {
  return db('users')
    .where({ filter })
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id')
  return getBy(id).first()
} 