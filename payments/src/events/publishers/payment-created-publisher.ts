import { PaymentCreatedEvent, Publisher, Subjects } from "@sgtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
