const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../database/setup");

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth flow", () => {
  test("registers a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("logs in user and returns JWT", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("fails login with wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
  });

  test("denies access to protected route without token", async () => {
    const res = await request(app).get("/workouts/me");
    expect(res.statusCode).toBe(401);
  });

  test("denies admin-only route to non-admin user", async () => {
    const res = await request(app)
      .get("/workouts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });
});

