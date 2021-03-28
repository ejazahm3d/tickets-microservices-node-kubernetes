import { Publisher, OrderCreatedEvent, Subjects } from "@sgtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
