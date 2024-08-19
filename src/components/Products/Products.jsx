import { useEffect, useState } from 'react'
import classes from "./Products.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

  
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  async function getProduct() {
    setisLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      setError(null);
      console.log(data);
      

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally{
      setisLoading(false);
    }
  }
  useEffect(() => {
    getProduct();
  }, [])

  useEffect(()=>{

    document.title = "Products Page"
  },[])


  return (
    <>
      <section className='py-20 min-h-[calc(100vh-124px)] px-14'>
        <div className='container mx-auto px-8 md:px-0'>
          <div >
          <h1 className='text-3xl font-bold mb-4'>All Products</h1>
         </div>
          {
           isLoading? (<Loader />) :
          error ?
            (<div className='alert'>{error}</div>
            ) :
            (
              <div className="row ">
                {
                  products.map((product) => 
              <Product product={product}  key={product.id}  />
                  )
                }
              </div>
            )
          }

        </div>
      </section>

    </>

  )
}
