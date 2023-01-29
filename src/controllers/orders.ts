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

  const employee = await prisma.employee.findUnique({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (!employee) {
    throw new CustomError("Employee not exists");
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
    }
  });

  const order = await prisma.order.create({
    select: {
      id_order: true,
      batch_order: {
        select: {
          id_batch: true,
          quantity_in_order: true,
        },
      },
    },
    data: {
      id_client: body.id_client,
      order_date: body.order_date,
      order_price: body.order_price,
      comments: body.comments,
      batch_order: {
        createMany: {
          data: body.batches,
        },
      },
      order_status: {
        create: {
          id_status: 1,
          id_employee: employee.id_employee,
          timestamp: new Date(),
        },
      },
    },
  });

  if (order) {
    const batchTransaction: any[] = [];
    order.batch_order.map((batch) => {
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
    });

    const updateBatchQuantityInStockTransaction = await prisma.$transaction(
      batchTransaction
    );
    if (updateBatchQuantityInStockTransaction.length <= 0) {
      await prisma.order.delete({
        where: {
          id_order: order.id_order,
        },
      });
    }
  }

  res.status(201).json(order);
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
          id_status: true,
          id_employee: true,
          timestamp: true,
          comments: true,
        },
        orderBy: [
          {
            timestamp: "desc",
          },
        ],
        take: 1,
      },
      client: true,
      batch_order: {
        select: {
          quantity_in_order: true,
          id_batch: true,
          batch: {
            select: {
              selling_price: true,
              purchase_price: true,
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
    include: {
      batch_order: {
        include: {
          batch: {
            select: {
              id_batch: true,
            },
          },
        },
      },
    },
    where: {
      id_order: orderId,
    },
  });

  if (order) {
    order.batch_order.map(async (batch) => {
      console.log("quantity_in_order", batch.quantity_in_order);
      console.log("id_batch", batch.id_batch);
      await prisma.batch.update({
        data: {
          quantity_in_stock: {
            increment: batch.quantity_in_order,
          },
        },
        where: {
          id_batch: batch.id_batch,
        },
      });
    });
  }

  res.status(201).json(order);
};

export default {
  createOrder,
  getMyOrders,
  deleteOrder,
};
