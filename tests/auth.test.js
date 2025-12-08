const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../database/setup");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth flow", () => {
  test("registers and logs in a user", async () => {
    const regRes = await request(app)
      .post("/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      });

    expect(regRes.statusCode).toBe(201);
    expect(regRes.body).toHaveProperty("id");

    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
  });
});
