const request = require("supertest")
const server = require("./server.js")

let token

describe("\n ** Server.js Accessing Routes ** \n", () => {
    describe("\n ** Attempt Login ** \n", () => {
        it("Should return 200 'OK'", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "user5",
                    password: "justgo"
                })
            expect(res.status).toBe(200)
        })
        it("Login info has not been provided inside the request header", async () => {
            const res = await request(server).post("/api/auth/login")
            expect(res.status).toBe(500)
        })
        it("throws error if login info is incorrect", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "user5",
                    password: "justgoaway"
                })
            expect(res.status).toBe(401)
        })
    })
    describe("\n ** Login and attempt on getting some jokes **\n", () => {
        it("Use Token received and Receive Jokes", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "user5",
                    password: "justgo"
                })

            token = res.body.token
            const expectedJoke = [
                {
                    "id": "0189hNRf2g",
                    "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
                }
            ]
            const resJoke = await request(server)
                .get("/api/jokes")
                .set("Authorization", `${token}`)
            expect(resJoke.status).toBe(200)
            expect(resJoke.body).toEqual(expect.arrayContaining(expectedJoke))
        })
        it("Deny Jokes if no token or invalid token is used for request", async () => {
            const resJoke = await request(server)
                .get("/api/jokes")
                .set("Authorization", `not-a-real-token`)
            expect(resJoke.status).toBe(401)
        })
    })
})
