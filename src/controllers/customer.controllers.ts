import type { Request, Response } from 'express';
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } from '../services/customers.services.js';

export const createCustomerController = async (req: Request, res: Response) => {
    try {
        const newCustomer = await createCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to create customer", details: error.message });
    }
};

export const getAllCustomersController = async (req: Request, res: Response) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to retrieve customers", details: error.message });
    }
};

export const getCustomerByIdController = async (req: Request, res: Response) => {
    try {
        const customer = await getCustomerById(Number(req.params.id));
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to retrieve customer", details: error.message });
    }
};

export const updateCustomerController = async (req: Request, res: Response) => {
    try {
        const updatedCustomer = await updateCustomer(Number(req.params.id), req.body);
        res.status(200).json(updatedCustomer);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to update customer", details: error.message });
    }
};

export const deleteCustomerController = async (req: Request, res: Response) => {
    try {
        await deleteCustomer(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to delete customer", details: error.message });
    }
};