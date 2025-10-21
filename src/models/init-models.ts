import type { Sequelize } from "sequelize";
import { customers as _customers } from "./customers";
import type { customersAttributes, customersCreationAttributes } from "./customers";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _customers as customers,
  _orders as orders,
  _products as products,
  _users as users,
  _users as users,
};

export type {
  customersAttributes,
  customersCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const customers = _customers.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const users = _users.initModel(sequelize);

  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  products.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(products, { as: "products", foreignKey: "user_id"});

  return {
    customers: customers,
    orders: orders,
    products: products,
    users: users,
    users: users,
  };
}
