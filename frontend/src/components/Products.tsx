import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  removeProduct,
} from "../redux/actions/product.action";
import ProductCard from "./ProductCard";
import { FaPlus, FaSyncAlt, FaRegFrown } from "react-icons/fa";
import { toast, ToastOptions } from "react-toastify";

export const toastOptios: ToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
};

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.loading);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    getAllProducts();
  }, [dispatch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await dispatch(fetchAllProducts());
    setIsRefreshing(false);
  };

  const handleDelete = async (id: number) => {
    const confirmation = confirm(`Are you sure you want to delete this product`);
    if (confirmation) {
      const res = await dispatch(removeProduct(id));
      console.log(res);
      if (res.type === "products/remove/fulfilled") {
        toast.success("Product deleted successfully", toastOptios);
      } else {
        toast.error("Error deleting product", toastOptios);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <button className="btn btn-primary gap-2">
          <FaPlus className="text-white" size={20} />
          <span className="text-white">Add Product</span>
        </button>

        <button
          onClick={handleRefresh}
          className={`btn btn-secondary gap-2 ${isRefreshing ? "loading" : ""}`}
        >
          <FaSyncAlt className="text-white" size={20} />
          <span className="text-white">Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="card w-72 bg-base-100 shadow-xl animate-pulse"
              >
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
          : products.length === 0 ? (
              <div className="flex flex-col items-center col-span-full text-center justify-center w-full max-w-lg mx-auto p-6 bg-primary text-primary-content rounded-lg shadow-xl">
                <FaRegFrown className="text-5xl md:text-6xl mb-4" />
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Oops! No Products Found</h2>
                <p className="text-base sm:text-lg">It seems we couldn't find any products. Please check back later or try adding new ones.</p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))
            )}
      </div>
    </div>
  );
};

export default Products;