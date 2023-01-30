"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const prisma_client_1 = require("../src/lib/prisma-client");
describe("User routes", () => {
    //   //   beforeAll((done) => {
    //   //     clearDB().then(() => done());
    //   //   });
    test("/api/auth/register - Create user account to test", async () => {
        const res = await utils_1.agent
            .post("/api/auth/register")
            .send({
            user_name: "test",
            email: "test.user@o2.pl",
            password: "1234",
            role: "employee",
        })
            .set("Accept", "application/json");
        expect(res.status).toEqual(201);
    });
    let token = "";
    let userId = 0;
    test("/api/auth/login - Login to test my user profile", async () => {
        const res = await utils_1.agent
            .post("/api/auth/login")
            .send({ email: "test.user@o2.pl", password: "1234" })
            .set("Accept", "application/json");
        token = res.body.token;
        console.log(res.body);
        userId = res.body.user.id_user;
        console.log("userId", userId);
        expect(res.status).toEqual(200);
    });
    describe("User routes - get my profile", () => {
        test("/api/users/my-user-profile - User can get profile data", async () => {
            const res = await utils_1.agent
                .get("/api/users/my-user-profile")
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token);
            expect(res.status).toEqual(200);
        });
        test("/api/users/my-user-profile - Not logged in", async () => {
            const res = await utils_1.agent.get("/api/users/my-user-profile");
            expect(res.status).toEqual(401);
        });
        test("/api/users/my-user-profile - User can only fetch their own profile data", async () => {
            const res = await utils_1.agent
                .get("/api/users/my-user-profile")
                .set("Authorization", "Bearer " + token);
            expect(res.status).toEqual(200);
            console.log("userId", userId);
            expect(res.body.id_user).toEqual(userId);
        });
        test("/api/users/my-user-profile - All necessary fields are returned", async () => {
            const res = await utils_1.agent
                .get("/api/users/my-user-profile")
                .set("Authorization", "Bearer " + token);
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty("id_user");
            expect(res.body).toHaveProperty("user_name");
            expect(res.body).toHaveProperty("email");
            expect(res.body).toHaveProperty("role");
            expect(res.body).toHaveProperty("avatar");
        });
    });
    describe("User routes - patch my profile", () => {
        test("/api/users/my-user-profile - Not logged in", async () => {
            const res = await utils_1.agent.patch("/api/users/my-user-profile");
            expect(res.status).toEqual(401);
        });
        test("/api/users/my-user-profile - Account updated successfully", async () => {
            const res = await utils_1.agent
                .patch("/api/users/my-user-profile")
                .set("Authorization", "Bearer " + token)
                .send({
                user_name: "updatedusername",
            });
            expect(res.status).toEqual(201);
            console.log("userId", userId);
            const user = await prisma_client_1.prisma.user.findUnique({
                where: { id_user: userId },
            });
            expect(user === null || user === void 0 ? void 0 : user.user_name).toEqual("updatedusername");
        });
    });
    //   describe("User routes - delete my profile", () => {});
    test("/api/users/my-user-profile-delete - Delete account to test", async () => {
        const res = await utils_1.agent
            .delete("/api/users/my-user-profile-delete")
            .set("Authorization", "Bearer " + token);
        console.log(token);
        expect(res.status).toEqual(200);
    });
});
//# sourceMappingURL=user.test.js.map