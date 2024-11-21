import React from "react";
import { Product } from "../../domain/models/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
