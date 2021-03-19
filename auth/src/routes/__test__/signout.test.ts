import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const signOutResponse = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(signOutResponse.get("Set-Cookie")[0]).toBe(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
