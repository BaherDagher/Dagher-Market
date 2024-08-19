import { useEffect, useState } from 'react'
import classes from "./Brands.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';


export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  async function getBrands() {
    setisLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      console.log(data);

      setBrands(data.data);
      setError(null);
      console.log(data);


    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setBrands([]);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
  }, [])


  useEffect(()=>{
    document.title = "Brands Page"
  },[])

  return (
    <>
      <section className='py-20 min-h-[calc(100vh-124px)]'>
        <div className='container mx-auto px-8 md:px-0'>
          <div>
            <h1 className='text-3xl font-bold mb-4' >All Brands</h1>
          </div>
          {
            isLoading ? (<Loader />) :
              error ?
                (<div className='alert'>{error}</div>
                ) :
                (
                  <div className="row ">
                    {
                      brands?.map((brand) =>
                        <div key={brand._id} className='w-full px-4 mb-6 pb-5 rounded-lg custom-product md:w-1/5' >
                          <Link to={`/specific-brand-products/${brand.name}`}>
                          <img src={brand.image} alt={brand.name} className='mb-2 mx-auto w-80 md:w-full  mt-2 h-80 object-cover ' />
                          <div className="text-center">
                            <h2 className="truncate font-bold mb-2 ">{brand.name}</h2>

                          </div>
                          </Link>

                        </div>
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
