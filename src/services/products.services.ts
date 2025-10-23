import { db } from '../config/db.config.js';
import { type productsCreationAttributes } from '../models/products.js';

export const createProduct = async (productData: productsCreationAttributes) => {
    const newProduct = await db.products.create(productData);
    return newProduct;
};

export const getAllProducts = async () => {
    const allProducts = await db.products.findAll();
    return allProducts;
};

export const getProductById = async (id: number) => {
    const product = await db.products.findByPk(id);
    return product;
};

export const updateProduct = async (id: number, updateData: Partial<productsCreationAttributes>) => {
    const product = await db.products.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    await product.update(updateData);
    return product;
};

export const deleteProduct = async (id: number) => {
    const product = await db.products.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    await product.destroy();
    return;
};