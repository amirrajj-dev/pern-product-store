import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "../redux/types";

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl transition-transform transform hover:scale-105">
      <figure className="relative">
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-t-lg" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-primary text-xl font-bold">${product.price}</p>

        <div className="flex justify-between items-center mt-3">
          <button
            className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
            onClick={() => onEdit(product.id)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="btn btn-sm btn-outline btn-error flex items-center gap-2"
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