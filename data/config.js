const knex = require("knex")
const knexfile = require("../knexfile")

console.log(process.env.NODE_ENV)

module.exports = knex(knexfile[process.env.NODE_ENV])

//module.exports = knex(knexfile.development)
