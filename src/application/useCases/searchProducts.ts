import { Product } from "../../domain/models/Product";
import { ProductRepository } from "../../infrastructure/repositories/ProductRepository";

export const searchProducts = async (query: string): Promise<Product[]> => {
    return await ProductRepository.searchProducts(query);
};
