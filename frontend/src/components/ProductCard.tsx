import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "../redux/types";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-content px-3 py-1 text-sm font-semibold rounded-lg shadow-md">
          ${product.price}
        </div>
      </div>

      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-primary brightness-150">
          {product.name}
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline btn-primary flex items-center gap-2 w-full sm:w-auto"
          >
            <FaEdit /> Edit
          </Link>
          <button
            className="btn btn-outline btn-error flex items-center gap-2 w-full sm:w-auto"
            onClick={() => onDelete(product.id)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
