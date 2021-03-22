import { Publisher, Subjects, TicketCreatedEvent } from "@sgtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
