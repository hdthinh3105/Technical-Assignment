import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../infrastructure/repositories/ProductRepository";

export const fetchProducts = async (
    skip: number,
    limit: number
): Promise<Product[]> => {
    return await ProductRepository.fetchProducts(skip, limit);
};
