import { useEffect, useState } from 'react'
import classes from "./RelatedProducts.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const {category} = useParams();

 

  async function getRelatedProducts() {
    setisLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const matchedCategoriesProducts = data.data.filter((product)=> product.category.name === category)
      setProducts(matchedCategoriesProducts);      
      setError(null);

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally{
      setisLoading(false);
    }
  }
  useEffect(() => {
    getRelatedProducts();
  }, [])

  return (
    <>
    <section className='py-1 min-h-[calc(100vh-124px)] px-14'>
      <div className='container mx-auto px-8 md:px-0'>
        <div className='text-3xl font-bold '>Related Products</div>
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

  </>  )
}
