const db = require("../../data/dbConfig")

module.exports = {
    add,
    findBy
}

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id)
  }

function findBy(filter) {
    return db("users as u")
      .join("roles as r", "u.role", "=", "r.id")
      .select("u.id", "u.username", "r.name as role", "u.password")
      .where(filter)
  }

  function findById(id) {
    return db("users as u")
      .join("roles as r", "u.role", "=", "r.id")
      .select("u.id", "u.username", "r.name as role")
      .where("u.id", id)
      .first()
  }