import { db } from '../config/db.config.js';
import { type customersCreationAttributes } from '../models/customers.js';

export const createCustomer = async (customerData: customersCreationAttributes) => {
    const newCustomer = await db.customers.create(customerData);
    return newCustomer;
};

export const getAllCustomers = async () => {
    const allCustomers = await db.customers.findAll();
    return allCustomers;
};

export const getCustomerById = async (id: number) => {
    const customer = await db.customers.findByPk(id);
    return customer;
};

export const updateCustomer = async (id: number, updateData: Partial<customersCreationAttributes>) => {
    const customer = await db.customers.findByPk(id);
    if (!customer) {
        throw new Error('Customer not found');
    }
    await customer.update(updateData);
    return customer;
};

export const deleteCustomer = async (id: number) => {
    const customer = await db.customers.findByPk(id
);
    if (!customer) {
        throw new Error('Customer not found');
    }
    await customer.destroy();
    return;
};