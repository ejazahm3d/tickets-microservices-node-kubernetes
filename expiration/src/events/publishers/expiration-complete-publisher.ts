import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@sgtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
