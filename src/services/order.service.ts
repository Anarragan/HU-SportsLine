import { db, sequelize } from "../config/db.config.js";
import type { ordersCreationAttributes } from "../models/orders.js";
import type { order_detailsCreationAttributes } from "../models/order_details.js";

interface CreateOrderInput extends ordersCreationAttributes {
  items: Array<{ product_id: number; quantity: number }>;
}

const validateAndPrepareProducts = async (items: { product_id: number; quantity: number }[]) => {
  const productIds = items.map(i => i.product_id);
  const products = await db.products.findAll({ where: { id: productIds } });

  if (products.length !== items.length)
    throw new Error("Uno o más productos no existen.");

  for (const item of items) {
    const product = products.find(p => p.id === item.product_id);
    if (!product) throw new Error(`Producto con ID ${item.product_id} no encontrado.`);
    if (product.stock < item.quantity)
      throw new Error(`Stock insuficiente para el producto "${product.name}".`);
  }

  return products;
};

export const createOrderService = async (orderData: CreateOrderInput) => {
  return await sequelize.transaction(async (transaction) => {
    const { customer_id, user_id, items } = orderData;

    const products = await validateAndPrepareProducts(items);

    const total = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.product_id)!;
      return sum + Number(product.price) * item.quantity;
    }, 0);

    const newOrder = await db.orders.create(
      { customer_id, user_id, total, order_date: new Date() },
      { transaction }
    );

    const orderDetailsData: order_detailsCreationAttributes[] = items.map(item => {
      const product = products.find(p => p.id === item.product_id)!;
      return {
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: Number(product.price),
      };
    });

    await db.order_details.bulkCreate(orderDetailsData, { transaction });

    for (const item of items) {
      const product = products.find(p => p.id === item.product_id)!;
      await product.update({ stock: product.stock - item.quantity }, { transaction });
    }

    return await db.orders.findByPk(newOrder.id, {
      include: [
        { model: db.customers, as: "customer" },
        {
          model: db.order_details,
          as: "order_details",
          include: [{ model: db.products, as: "product" }],
        },
      ],
      transaction,
    });
  });
};

// services/order.service.ts
export const getOrdersService = async (filters: {
  customer_id?: number;
  product_id?: number;
}) => {
  const where: any = {};
  if (filters.customer_id) where.customer_id = filters.customer_id;

  const include: any = [
    { model: db.customers, as: "customer" },
    {
      model: db.order_details,
      as: "order_details",
      include: [{ model: db.products, as: "product" }],
    },
  ];

  if (filters.product_id) {
    include[1].where = { product_id: filters.product_id };
  }

  return await db.orders.findAll({
    where,
    include,
    order: [["created_at", "DESC"]],
  });
};