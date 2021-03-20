import request from "supertest";
import { app } from "../../app";

const createTicket = async () => {
  return await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "a",
      price: 12,
    })
    .expect(201);
};

it("can fecth a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
