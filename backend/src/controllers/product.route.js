import {sql} from '../utils/db.js'

export const getAllProducts = async (req, res) =>{
    try {
        const result = await sql`SELECT * FROM products ORDER BY created_at DESC`
        res.status(200).json({
            data: result.rows,
            success : true,
            message: 'Products fetched successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error' , success: false})
    }
}

export const createProduct = async (req, res) =>{}

export const getOneProduct = async (req, res) =>{}

export const updateProduct = async (req, res) =>{}

export const deleteProduct = async (req, res) =>{}