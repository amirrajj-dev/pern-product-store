import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/product.action";
import ProductCard from "./ProductCard";

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    const getAllProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {isLoading
          ? 
            [...Array(8)].map((_, index) => (
              <div key={index} className="card w-72 bg-base-100 shadow-xl animate-pulse">
                <div className="h-48 w-full bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          :
            products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default Products;