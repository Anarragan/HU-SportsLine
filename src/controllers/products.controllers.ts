import type { Request, Response } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../services/products.services.js";

export const createProductController = async (req: Request, res: Response) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to create product", details: error.message });
    }
};

export const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to retrieve products", details: error.message });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to retrieve product", details: error.message });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await updateProduct(Number(req.params.id), req.body);
        res.status(200).json(updatedProduct);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to update product", details: error.message });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        await deleteProduct(Number(req.params.id));
        res.status(204).send();
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ error: "Failed to delete product", details: error.message });
    }
};

