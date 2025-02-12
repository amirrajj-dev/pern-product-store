import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { toastOptions } from "../../components/Products";
import {
  fetchProduct,
  removeProduct,
  updateProduct,
} from "../../redux/actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector(
    (state: RootState) => state.products.selectedProduct
  );
  const loading = useSelector((state: RootState) => state.products.loading);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        await dispatch(fetchProduct(+id));
      }
    };
    getProduct();
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setPrice(product.price?.toString() || "");
      setImageUrl(product.image || "");
    }
  }, [product]);

  const handleSaveChanges = async () => {
    if (
      productName.trim() &&
      (productName.trim() !== product?.name ||
        price.trim() !== product?.price?.toString() ||
        imageUrl !== product?.image)
    ) {
      const updatedProduct = {
        id: +product!.id,
        product: {
          name: productName || product?.name,
          price: +price || product?.price, 
          image: imageUrl || product?.image,
        },
      };

      const res = await dispatch(updateProduct(updatedProduct));
      if (res.type === "products/update/fulfilled") {
        toast.success("Product updated successfully" , toastOptions);
      } else {
        toast.error("Failed to update product" , toastOptions);
      }
    } else {
      toast.info("No changes detected." , toastOptions);
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      await dispatch(removeProduct(+id!));
      toast.success("Product deleted successfully" , toastOptions);
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto w-full flex flex-col items-center justify-center bg-base-200 p-6">
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline btn-secondary flex items-center gap-2 mb-6"
      >
        <FaArrowLeft className="text-lg" />
        <span>Back to Products</span>
      </button>

      <div className="w-full max-w-4xl bg-base-100 shadow-lg p-8 rounded-xl border border-gray-300 flex flex-col md:flex-row items-center md:items-start gap-6">
        {loading ? (
          <div className="w-full flex flex-col items-center md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full h-80 bg-gray-300 rounded-xl"></div>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <div className="skeleton h-6 w-1/3 rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>

              <div className="skeleton h-6 w-1/3 rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>

              <div className="skeleton h-6 w-1/3 rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>

              <div className="flex justify-between mt-6">
                <div className="skeleton h-12 w-32 rounded"></div>
                <div className="skeleton h-12 w-32 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full md:w-1/2 flex justify-center self-center">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-80 object-cover rounded-xl shadow-md border border-gray-200"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input input-bordered w-full mt-2"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleDelete}
                  className="btn btn-error flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FaSave /> Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
