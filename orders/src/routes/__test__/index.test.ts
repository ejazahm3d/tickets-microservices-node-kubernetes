import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "some",
    price: 2,
  });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  // Create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  //Create one order as User #1
  await request(app).post("/api/orders").set("Cookie", userOne).send({
    ticketId: ticketOne.id,
  });

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({
      ticketId: ticketTwo.id,
    });

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({
      ticketId: ticketThree.id,
    });

  // Make request to get orders for User #2

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .send({})
    .expect(200);

  // Make sure we only got the orders for user # 2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[1].ticket.id).toEqual(ticketThree.id);
});
