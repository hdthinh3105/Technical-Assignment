import axios from "axios";
import { Product } from "../../domain/models/Product";

const API_URL = "https://dummyjson.com/products";

export class ProductRepository {
    static async fetchProducts(skip: number, limit: number): Promise<Product[]> {
        const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
        return response.data.products;
    }

    static async searchProducts(query: string): Promise<Product[]> {
        const response = await axios.get(`${API_URL}/search?q=${query}`);
        return response.data.products;
    }
}
