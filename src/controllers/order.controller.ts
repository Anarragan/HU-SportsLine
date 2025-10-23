// controllers/order.controller.ts
import type { Request, Response } from "express";
import { createOrderService, getOrdersService } from "../services/order.service.js";
import { createOrderSchema } from "../schema/order.schema.js";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const validation = createOrderSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues });
    }

    const newOrder = await createOrderService(validation.data);
    return res.status(201).json({
      message: "Pedido creado con éxito",
      order: newOrder,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const { customer_id, product_id } = req.query;
    const filters: { customer_id?: number; product_id?: number } = {};
    if (typeof customer_id !== "undefined" && customer_id !== "") {
      filters.customer_id = Number(customer_id);
    }
    if (typeof product_id !== "undefined" && product_id !== "") {
      filters.product_id = Number(product_id);
    }
    const orders = await getOrdersService(filters);
    return res.json(orders);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};