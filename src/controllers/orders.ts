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
  id_batch: z.number(),
  quantity_in_order: z.number(),
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

  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }

  const employee = await prisma.employee.findMany({
    where: {
      id_user: currentLoggedUser,
    },
  });

  if (employee.length <= 0) {
    throw new CustomError("Employee not exists");
  }

  const order = await prisma.order.create({
    data: body,
  });

  if (!order) {
    throw new CustomError("Problem with order");
  }

  const batch_order = await prisma.batch_Order.create({
    data: { ...body, id_order: order.id_order },
  });

  if (!batch_order) {
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
    await prisma.batch_Order.delete({
      where: {
        id_batch_order: batch_order.id_batch_order,
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
      order_date: true,
      order_price: true,
      comments: true,
      batch_order: true,
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
  const orderId = req.params.id
    .split(",")
    .map((e) => parseInt(e))
    .filter((e) => !isNaN(e));

  const currentLoggedUser = req.user;
  if (!currentLoggedUser) {
    throw Error("No user id in request object");
  }
  const order = await prisma.order.deleteMany({
    where: {
      id_order: {
        in: orderId,
      },
      AND: {
        order_status: {
          some: {
            employee: {
              id_user: currentLoggedUser,
            },
          },
        },
      },
    },
  });
  res.status(201).json(order);
};

// const getSelectedPalettes = async (req: Request, res: Response) => {
//   console.log(req.params.id);
//   const palettesId = req.params.id
//     .split(",")
//     .map((e) => parseInt(e))
//     .filter((e) => !isNaN(e));

//   const palettes = await prisma.pallet.findMany({
//     select: {
//       id_pallet: true,
//       pallet_name: true,
//       purchase_price: true,
//       purchase_date: true,
//       delivery_date: true,
//       supplier: true,
//       batch: {
//         select: {
//           id_batch: true,
//           batch_name: true,
//           quantity_in_delivery: true,
//           quantity_in_stock: true,
//           purchase_price: true,
//           selling_price: true,
//           description: true,
//           condition: true,
//           product: true,
//         },
//       },
//     },
//     where: {
//       id_pallet: { in: palettesId },
//     },
//   });
//   // res.status(201).json(palettes);
//   // res.status(201).json(
//   //   palettes.forEach((pallet) => ({
//   //     ...pallet,
//   //     purchase_date: pallet.purchase_date.toISOString(),
//   //     delivery_date: pallet.delivery_date.toISOString(),
//   //   }))
//   // );
//   palettes.forEach((pallet) => ({
//     ...pallet,
//     purchase_date: pallet.purchase_date.toISOString(),
//     delivery_date: pallet.delivery_date.toISOString(),
//   }));

//   res.status(201).json(palettes);
// };

export default {
  createOrder,
  getMyOrders,
};
