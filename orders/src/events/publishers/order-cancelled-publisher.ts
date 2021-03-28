import { Publisher, OrderCancelledEvent, Subjects } from "@sgtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
