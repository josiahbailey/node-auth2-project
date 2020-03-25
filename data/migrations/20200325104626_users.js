exports.up = function (knex) {
  return knex.schema.createTable('users', urs => {
    urs.increments()

    urs.varchar('username', 128)
      .unique()
      .notNullable()

    urs.varchar('password', 128)
      .notNullable()

    urs.string('department')
      .notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
};
