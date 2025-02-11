import { useEffect } from 'react'
import {AppDispatch , RootState} from '../redux/store'
import { useDispatch , useSelector } from 'react-redux'
import {fetchAllProducts} from '../redux/actions/product.action'
const Products = () => {
    const dispatch : AppDispatch = useDispatch()
    const products = useSelector((state: RootState) => state.products)
    useEffect(()=>{
        const getAllProducts = async ()=>{
           const res = await dispatch(fetchAllProducts())
           console.log(res);
        }
        getAllProducts()
    }, [dispatch])
  return (
    <div>Products</div>
  )
}

export default Products