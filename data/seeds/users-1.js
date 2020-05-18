exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ name: "bob" },
		{ name: "mary" },
		{ name: "john" },
		{ name: "sarah" },
	])
}
