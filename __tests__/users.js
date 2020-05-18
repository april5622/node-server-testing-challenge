const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

beforeEach(async () => {
    await db.migrate.latest()
    await db.seed.run() 

})

afterAll(async () => {
    await db.destroy()

})


describe("users integreation tests", () => {
    it("GET /users", async () => {
        const res = await supertest(server).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[0].name).toBe("bob")
        expect(res.body[1].name).toBe("mary")
    })

    it("GET /users/:id", async () => {
        const res = await supertest(server).get("/users/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("mary")
    })
        
    it("GET /users/:id (NOT FOUND", async () => {
            const res = await supertest(server).get("/users/40")
            expect(res.statusCode).toBe(404)    
    })

    
    it("POST /users", async () => {
        const data = { name: "george" }
        const res = await supertest(server).post("/users").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("george")    
    })

    it("DELETE /users/:id", async () => {
        const res = await supertest(server).delete("/users/3")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")    
    })

    it("PUT /users/:id", async () => {
        const data = { name: "sam" }
        const res = await supertest(server).put("/users/1").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        //expect(res.body.name).toBe("sam")    
    })
})
