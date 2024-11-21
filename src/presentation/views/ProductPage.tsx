import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProducts } from "../../application/useCases/fetchProducts";
import { searchProducts } from "../../application/useCases/searchProducts";
import { Product } from "../../domain/models/Product";
import ProductList from "../components/ProductList";

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0); // Số trang hiện tại

    const limit = 20;

    // Hàm tải sản phẩm
    const loadProducts = useCallback(async () => {
        try {
            const skip = page * limit; // Tính `skip` dựa trên trang hiện tại
            const newProducts = await fetchProducts(skip, limit);

            setProducts((prev) => [...prev, ...newProducts]);

            // Nếu trả về ít hơn `limit`, ngừng tải thêm
            if (newProducts.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }, [page]);

    // Hàm tìm kiếm sản phẩm
    const handleSearch = useCallback(
        async (query: string) => {
            setSearchQuery(query); // Cập nhật từ khóa tìm kiếm

            if (query.trim() === "") {
                // Reset về trạng thái mặc định nếu từ khóa trống
                setProducts([]);
                setPage(0);
                setHasMore(true);
            } else {
                // Tìm kiếm sản phẩm qua API
                const searchResults = await searchProducts(query);
                setProducts(searchResults);
                setHasMore(false); // Không cuộn vô hạn khi tìm kiếm
            }
        },
        []
    );

    // Tải dữ liệu ban đầu khi không tìm kiếm
    useEffect(() => {
        if (searchQuery === "") {
            loadProducts();
        }
    }, [loadProducts, searchQuery]);

    // Hàm tải thêm sản phẩm khi cuộn
    const fetchNextPage = () => {
        if (!searchQuery) {
            setPage((prev) => prev + 1); // Tăng trang và gọi `loadProducts`
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Danh sách sản phẩm</h1>
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    fontSize: "16px",
                }}
            />
            <InfiniteScroll
                dataLength={products.length} // Số lượng sản phẩm hiện tại
                next={fetchNextPage} // Hàm gọi khi cuộn xuống cuối
                hasMore={hasMore} // Kiểm tra còn sản phẩm không
                loader={<h4>Đang tải...</h4>}
                endMessage={<p>Đã hiển thị tất cả sản phẩm.</p>}
            >
                <ProductList products={products} />
            </InfiniteScroll>
        </div>
    );
};

export default ProductPage;
