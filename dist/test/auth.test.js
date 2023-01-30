"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe("Login routes", () => {
    //   beforeAll((done) => {
    //     clearDB().then(() => done());
    //   });
    test("/api/auth/login - User can login", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ email: "urban_radoslaw@o2.pl", password: "123456" })
            .set("Accept", "application/json");
        expect(res.status).toEqual(401);
    });
    test("/api/auth/login - Missing email", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ password: "1234" })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/login - Missing password", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ email: "urban_radoslaw@o2.pl" })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/login - Empty request body", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/login - User can login", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ email: "urban_radoslaw@o2.pl", password: "1234" })
            .set("Accept", "application/json");
        expect(res.status).toEqual(200);
    });
});
describe("Register and deleted routes", () => {
    //   beforeAll((done) => {
    //     clearDB().then(() => done());
    //   });
    let token = "";
    test("/api/auth/register - Blank username", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "",
            email: "test.test@o2.pl",
            password: "1234",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/register - Invalid email", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "test",
            email: "notanemail",
            password: "1234",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/register - Password too short", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "test",
            email: "test.test@o2.pl",
            password: "",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/register - User can register", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "test",
            email: "test.test@o2.pl",
            password: "1234",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(201);
    });
    test("/api/auth/register - User already exists", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "test",
            email: "test.test@o2.pl",
            password: "1234",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(400);
    });
    test("/api/auth/login - User can login", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ email: "test.test@o2.pl", password: "1234" })
            .set("Accept", "application/json");
        token = res.body.token;
        expect(res.status).toEqual(200);
    });
    test("/api/users/my-user-profile-delete - Not logged in", async () => {
        const res = await utils_1.agent.delete("/api/users/my-user-profile-delete");
        expect(res.status).toEqual(401);
    });
    test("/api/users/my-user-profile-delete - Account deleted successfully", async () => {
        const res = await utils_1.agent
            .delete("/api/users/my-user-profile-delete")
            .set("Authorization", "Bearer " + token);
        expect(res.status).toEqual(200);
    });
});
//# sourceMappingURL=auth.test.js.map