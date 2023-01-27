import { prisma } from "../lib/prisma-client";
import { Request, Response } from "express";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import { CustomError, ValidationError } from "../errors";

const createOrderSchema = z.object({
  id_client: z.number(),
  order_date: z.string().min(1),
  order_price: z.number(),
  comments: z.string().optional(),
  batches: z.array(
    z.object({
      id_batch: z.number(),
      quantity_in_order: z.number(),
    })
  ),
});

const patchOrderSchema = z.object({
  id_client: z.number().optional(),
  order_date: z.string().min(1).optional(),
  order_price: z.number().optional(),
  comments: z.number().optional(),
});

const createOrder = async (req: Request, res: Response) => {
  const validation = createOrderSchema.safeParse(req.body);

  if (!validation.success) {
    const errorMessage = generateErrorMessage(validation.error.issues);
    throw new ValidationError(errorMessage);
  }

  const body = validation.data;
  const currentLoggedUser = req.user;
  console.log("currentLoggedUser", currentLoggedUser);
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.findMany({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (!employee[0]) {
    throw new CustomError("Employee not exists");
  } else {
    console.log("employee done");
  }

  body.batches.map(async (batch) => {
    const currentBatch = await prisma.batch.findFirst({
      where: {
        id_batch: batch.id_batch,
      },
    });
    if (
      currentBatch &&
      currentBatch.quantity_in_stock < batch.quantity_in_order
    ) {
      res.status(404).json({
        error: {
          message: `Not enough product in stock ${currentBatch?.id_batch}`,
        },
      });
      // throw new CustomError(
      //   `Not enough product in stock ${currentBatch?.id_product}`
      // );
    }
  });

  const order = await prisma.order.create({
    data: {
      id_client: body.id_client,
      order_date: body.order_date,
      order_price: body.order_price,
      comments: body.comments,
    },
  });

  if (!order) {
    throw new CustomError("Problem with order");
  }
  const batchTransaction: any[] = [];

  body.batches.forEach((batch) => {
    const updateResult = prisma.batch.update({
      data: {
        quantity_in_stock: {
          decrement: batch.quantity_in_order,
        },
      },
      where: {
        id_batch: batch.id_batch,
      },
    });
    batchTransaction.push(updateResult);
    const createResult = prisma.batch_Order.create({
      data: { ...batch, id_order: order.id_order },
    });
    batchTransaction.push(createResult);
  });

  const batch_order = await prisma.$transaction(batchTransaction);

  if (batch_order.length <= 0) {
    await prisma.order.delete({
      where: {
        id_order: order.id_order,
      },
    });
    throw new CustomError("Problem with order batch");
  }

  const order_status = await prisma.order_Status.create({
    data: {
      id_order: order.id_order,
      id_status: 1,
      id_employee: employee?.[0].id_employee,
      timestamp: new Date(),
    },
  });

  if (!order_status) {
    const batchOrdersId = batch_order.map((batch) => batch.id_batch_order);
    await prisma.batch_Order.deleteMany({
      where: {
        id_batch_order: { in: batchOrdersId },
      },
    });
    await prisma.order.delete({
      where: {
        id_order: order.id_order,
      },
    });
    throw new CustomError("Problem with order status");
  }

  res.status(201).json(order);
  // res.status(201).json("done");
};

const getMyOrders = async (req: Request, res: Response) => {
  console.log(req.user);
  const currentLoggedUser = req.user;

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const orders = await prisma.order.findMany({
    select: {
      id_order: true,
      order_date: true,
      order_price: true,
      comments: true,
      order_status: {
        select: {
          id_order_status: true,
          status: true,
          id_employee: true,
          timestamp: true,
          comments: true,
        },
      },
      client: true,
      batch_order: {
        select: {
          quantity_in_order: true,
          id_batch: true,
          batch: {
            select: {
              batch_name: true,
              condition: true,
              product: {
                select: {
                  id_product: true,
                  product_name: true,
                  image: true,
                  EAN: true,
                  ASIN: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      order_status: {
        some: {
          employee: {
            id_user: currentLoggedUser,
          },
        },
      },
    },
  });
  res.status(201).json(orders);
};

const deleteOrder = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const order = await prisma.order.delete({
    where: {
      id_order: orderId,
    },
  });
  res.status(201).json(order);
};

export default {
  createOrder,
  getMyOrders,
  deleteOrder,
};
