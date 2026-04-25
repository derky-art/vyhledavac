const request = require("supertest");
const app = require("../server");

test("vrací pole výsledků", async () => {
  const res = await request(app).get("/api/search?q=test");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);

  if (res.body.length > 0) {
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("link");
    expect(res.body[0]).toHaveProperty("snippet");
  }
});