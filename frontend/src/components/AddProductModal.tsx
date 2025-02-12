import { useState } from "react";
import { FaTimes} from "react-icons/fa";
import { toast } from "react-toastify";
import { toastOptions } from "./Products";
import {AppDispatch} from '../redux/store'
import {addProduct} from '../redux/actions/product.action'
import { useDispatch } from "react-redux";

const AddProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch : AppDispatch = useDispatch()

  const handleSubmit = async () => {
    if (!productName.trim() || !price || !imageUrl.trim()) {
      toast.error("Please fill in all fields.", toastOptions);
      return;
    }
    
    const res = await dispatch(addProduct({name : productName.trim() , image : imageUrl.trim() , price : +price}))
    if (res.type === "products/add/fulfilled"){
      toast.success("Product added successfully.", toastOptions);
      closeModal();
    }else{
      toast.error("Failed to add product.", toastOptions);
    }
  };

  const closeModal = () => {
    setProductName("");
    setPrice("");
    setImageUrl("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="modal modal-open">
            <div className="modal-box bg-primary p-8 rounded-lg shadow-xl w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-content">
                  Add New Product
                </h2>
                <button
                  onClick={onClose}
                  className="text-xl text-primary-content cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-primary-content">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="input input-bordered w-full mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-primary-content">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered w-full mt-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product price"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-primary-content">
                    Image URL
                  </label>
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="input input-bordered w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={onClose}
                    className="btn btn-outline btn-bg-primary-content text-primary-content w-32 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-bg-primary-content w-32"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
