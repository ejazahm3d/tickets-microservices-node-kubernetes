import {
  Listener,
  ExpirationCompleteEvent,
  Subjects,
  OrderStatus,
} from "@sgtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;
  async onMessage(
    data: ExpirationCompleteEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) throw new Error("Order not found");

    order.set({
      status: OrderStatus.Cancelled,
    });

    if (order.status == OrderStatus.Complete) {
      return msg.ack();
    }

    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      ticket: { id: order.ticket.id },
      version: order.version,
    });

    msg.ack();
  }
}
