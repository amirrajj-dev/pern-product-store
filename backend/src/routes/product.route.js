import express from 'express'
import {getAllProducts , createProduct, getOneProduct , deleteProduct , updateProduct} from '../controllers/product.controller.js'

const router = express.Router()

router.get('/' , getAllProducts)
router.get('/:id' , getOneProduct)
router.post('/' , createProduct)
router.delete('/:id' , deleteProduct)
router.put('/:id' , updateProduct)

export default router