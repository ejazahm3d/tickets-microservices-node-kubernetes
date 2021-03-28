import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@sgtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .not()
      .isEmpty()
      .isFloat({
        gt: 0,
      })
      .withMessage("Price must be greater than zero"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const ticket = await Ticket.findById(req.params.id);

    // if (!ticket) throw new NotFoundError();

    // if (ticket.userId !== req.currentUser?.id) {
    //   throw new NotAuthorizedError();
    // }

    // const { title, price } = req.body;

    // ticket.set({
    //   title,
    //   price,
    // });

    // await ticket.save();

    // new TicketUpdatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    //   version: ticket.__v!,
    // });

    res.status(200);
    // .send(ticket);
  }
);

export { router as deleteOrderRouter };
