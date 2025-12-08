const request = require("supertest");
const app = require("../server");
const { sequelize, User, Exercise } = require("../database/setup");
const bcrypt = require("bcryptjs");

let userToken;
let exerciseId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await User.create({
    username: "adam",
    email: "adam@example.com",
    passwordHash,
    role: "user"
  });

  const exercise = await Exercise.create({
    name: "Running",
    category: "cardio"
  });
  exerciseId = exercise.id;

  const loginRes = await request(app)
    .post("/auth/login")
    .send({ email: "adam@example.com", password: "password123" });

  userToken = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Workout CRUD", () => {
  test("creates a workout for logged in user", async () => {
    const res = await request(app)
      .post("/workouts")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        exerciseId,
        date: "2025-01-01",
        duration: 45,
        notes: "good session"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.userId).toBeDefined();
  });

  test("gets workouts for logged in user", async () => {
    const res = await request(app)
      .get("/workouts/me")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
