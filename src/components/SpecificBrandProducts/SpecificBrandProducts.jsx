import { useEffect, useState } from 'react'
import classes from "./SpecificBrandProducts.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function SpecificBrandProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const { brand } = useParams();


  async function getSpecificBrandProducts() {
    setisLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      const matchedBrandProducts = data.data.filter((product) => product.brand.name === brand)
      setProducts(matchedBrandProducts);
      if (matchedBrandProducts == "") {
        setError("No products are currently available in this brand.");
      }
      else {
        setError(null);

      }

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    getSpecificBrandProducts();
  }, [])

  useEffect(()=>{
    document.title = "Specific Brand Page"
  },[])


  return (
    <>
      <section className='py-1 min-h-[calc(100vh-124px)] px-14'>
        <div className='container mx-auto px-8 md:px-0'>
          <div>
            <h1 className='text-3xl font-bold mb-4'>{`${brand} Products`}</h1>
          </div>
          {
            isLoading ? (<Loader />) :
              error ?
                (
                    <div className='bg-green-500 text-center text-white p-5'>{error}</div>

                ) :
                (
                  <div className="row ">
                    {
                      products.map((product) =>
                        <Product product={product} key={product.id} />
                      )

                    }
                  </div>
                )
          }

        </div>
      </section>

    </>)
}
