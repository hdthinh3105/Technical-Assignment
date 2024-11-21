import React from "react";
import { Product } from "../../domain/models/Product";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.title}</h3>
            <p>Giá: ${product.price}</p>
        </div>
    );
};

export default ProductCard;
