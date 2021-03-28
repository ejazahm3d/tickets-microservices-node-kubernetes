import { Ticket } from "../ticket";
import mongoose from "mongoose";

it("implements optimistic concurrency control", async (done) => {
  const ticket = Ticket.build({
    title: "Tick",
    price: 20,
    userId: "sadas",
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  await firstInstance?.save();

  try {
    await secondInstance?.save();
  } catch {
    return done();
  }

  throw new Error("should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "Tick",
    price: 20,
    userId: "sadas",
  });
  await ticket.save();

  expect(ticket.version).toBe(0);
  await ticket.save();
  expect(ticket.version).toBe(1);
  await ticket.save();
  expect(ticket.version).toBe(2);
});
