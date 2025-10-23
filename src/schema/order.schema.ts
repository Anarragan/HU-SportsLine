import zod from "zod";

export const orderItemSchema = zod.object({
  product_id: zod.number().int().positive(),
  quantity: zod.number().int().min(1),
});

export const createOrderSchema = zod.object({
  customer_id: zod.number().int().positive(),
  user_id: zod.number().int().positive(),
  items: zod.array(orderItemSchema).min(1),
});

export type CreateOrderDTO = zod.infer<typeof createOrderSchema>;
