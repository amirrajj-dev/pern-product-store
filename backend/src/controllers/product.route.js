import { sql } from "../utils/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    res.status(200).json({
      data: result,
      success: true,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const createProduct = async (req, res) => {};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;
    return res.status(200).json({
        message : 'product fetched successfully',
        success : true,
        data : result
    })
  } catch (error) {
    return res.status(500).json({
      error,
      message: "error fetching the product",
      success: false,
    });
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
