import { agent } from "./utils";
import { prisma } from "../src/lib/prisma-client";

describe("Pallets routes", () => {
  //   //   beforeAll((done) => {
  //   //     clearDB().then(() => done());
  //   //   });
  test("/api/auth/register - Create user account to test", async () => {
    const res = await agent
      .post("/api/auth/register")
      .send({
        user_name: "test",
        email: "test.pallet@o2.pl",
        password: "1234",
        role: "employee",
      })
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });

  let token = "";
  let userId = 0;
  let supplierId = 0;
  let companyId = 0;
  let employeeId = 0;

  test("/api/auth/login - Login to test my user profile", async () => {
    const res = await agent
      .post("/api/auth/login")
      .send({ email: "test.pallet@o2.pl", password: "1234" })
      .set("Accept", "application/json");
    token = res.body.token;
    userId = res.body.user.id_user;
    console.log("token", token);
    console.log("userId", userId);
    expect(res.status).toEqual(200);
  });

  test("/api/employees - Create my employee profile", async () => {
    const res = await agent
      .post("/api/employees")
      .send({
        first_name: "Radosław",
        last_name: "Urban",
        PESEL: "12312312311",
        phone: "536290099",
        email: "urban_radoslaw@o2.pl",
        country: "Polska",
        province: "Małopolskie",
        postal_code: "33-180",
        city: "Gromnik",
        street: "Okulickiego 4",
      })
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token);
    employeeId = res.body.id_employee;
    console.log("employeeId", employeeId);

    expect(res.status).toEqual(201);
  });

  test("/api/companies - Create my company", async () => {
    const res = await agent
      .post("/api/companies")
      .send({
        first_name: "first_name",
        last_name: "last_name",
        company_name: "company_name",
        NIP: "9999999999",
        REGON: "9999999999",
        phone: "999999999",
        email: "test.test@o2.pl",
        country: "country",
        province: "province",
        postal_code: "33-180",
        city: "city",
        street: "street",
      })
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token);
    companyId = res.body.id_company;
    console.log("companyId", companyId);
    expect(res.status).toEqual(201);
  });

  describe("Supplier routes - create supplier", () => {
    test("/api/suppliers - User can create pallet", async () => {
      const res = await agent
        .post("/api/suppliers")
        .send({
          first_name: "SupplierName",
          last_name: "SupplierLastName",
          supplier_name: "SupplierNameCompany",
          NIP: "9999999999",
          REGON: "9999999999",
          phone: "999999999",
          email: "suplier.suplier@o2.pl",
          country: "Polska",
          province: "Małopolska",
          postal_code: "33-180",
          city: "Kraków",
          street: "Ogrodowa 6",
        })
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token);
      supplierId = res.body.id_supplier;
      expect(res.status).toEqual(201);
    });
  });

  describe("Pallets routes - create pallet", () => {
    test("/api/pallets - User can create pallet", async () => {
      const res = await agent
        .post("/api/pallets")
        .send({
          id_supplier: supplierId,
          id_employee: employeeId,
          purchase_price: 999,
          pallet_name: "PalletTestName",
          purchase_date: "2023-01-22T19:52",
          delivery_date: "2023-01-22T19:52",
        })
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(201);
    });

    test("/api/pallets/my-pallets - Not logged in", async () => {
      const res = await agent.get("/api/pallets/my-pallets");
      expect(res.status).toEqual(401);
    });

    describe("Pallets routes - get my pallets", () => {
      test("/api/pallets/my-pallets - User can get profile data", async () => {
        const res = await agent
          .get("/api/pallets/my-pallets")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token);
        expect(res.status).toEqual(201);
      });

      test("/api/pallets/my-pallets - myPallets", async () => {
        const res = await agent
          .get("/api/pallets/my-pallets")
          .set("Authorization", "Bearer " + token);
        expect(res.status).toEqual(201);
        if (res.body > 0) {
          expect(res.body[0]).toHaveProperty("id_pallet");
          expect(res.body[0]).toHaveProperty("pallet_name");
          expect(res.body[0]).toHaveProperty("purchase_price");
          expect(res.body[0]).toHaveProperty("purchase_date");
          expect(res.body[0]).toHaveProperty("delivery_date");
          expect(res.body[0]).toHaveProperty("supplier");
          expect(res.body[0]).toHaveProperty("batch");
        }
      });
    });
  });
  test("/api/users/my-user-profile-delete - Delete account to test", async () => {
    const res = await agent
      .delete("/api/users/my-user-profile-delete")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toEqual(200);
  });
});
