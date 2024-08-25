import { useContext, useEffect, useState } from 'react'
import classes from "./Wishlist.module.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { WishlistContext } from '../../context/WishlistContext';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {
  const { accessToken } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();
  const { wishlistProducts, getWishlist, removeFromWishlist, setwishlistProducts } = useContext(WishlistContext);



  // Function to fetch cart details
  async function getWishlistDetails() {
    setisLoading(true); // Ensure loader is turned off after the data is fetched
    try {
      const allWishListProducts = await getWishlist();
      console.log(allWishListProducts);
      // setwishlistProducts(allWishListProducts)
      if (allWishListProducts.status === "success" &&(allWishListProducts.count > 0 ) ) {
        setError(null);
      } else {
        setError('Your Wishlist Is Empty');
        setwishlistProducts([]);
      }
    }
    finally {
      setisLoading(false); // Ensure loader is turned off after the data is fetched
    }
  }

  async function removeProductFromWishlist(productId) {
    const res = await removeFromWishlist(productId);

    if (res.status === "success") {
      getWishlistDetails();
      toast.success('Product removed successfully from your wishlist!', {
        position: 'top-right',
        autoClose: 1500,
      })
    }
    else {
      toast.error("Something Went Wrong",
        {
          position: 'top-right',
          autoClose: 1500,
        }
      );
    }
  }

  async function addWishedProductToCart(productId) {
    const res = await addToCart(productId);

    if (res.status === "success") {
      removeProductFromWishlist(productId);
      toast.success(res.message, {
        position: 'top-right',
        autoClose: 1000,

      });
    }
    else {
      toast.error("Login to add products to cart",
        {
          position: 'top-right',
          autoClose: 1000,
        },
        setTimeout(() => {
          navigate("/login")
        }, 1500)

      );
    }
  }

  useEffect(()=>{
    document.title = "Wishlist Page"
  },[])



  useEffect(() => {
    accessToken && getWishlistDetails()
  }, [accessToken])

  return (
    <>

      <section className="py-10 lg:py-20 min-h-[calc(100vh-124px)]">
        <div className="container mx-auto " >
          {
            isLoading ? (<Loader />) :
              error ?
                (<div className='bg-green-500 text-center text-white p-5'>{error}</div>
                ) :
                (
                  wishlistProducts && (
                    <div className="row ">
                      <div className="lg:w-4/6  w-full mx-auto px-10 lg:px-0">
                        <div className='lg:rounded-xl overflow-hidden rounded-md   lg:shadow-[0px_2px_15px_rgba(0,0,0,0.1)]' >
                          <table className="  relative overflow-x-auto shadow-[0px_2px_15px_rgba(0,0,0,0.1)] sm:rounded-xl  w-full text-sm text-left rtl:text-right text-green-500 dark:text-green-400 ">
                            <thead className=" lg:text-xs text-white  uppercase bg-green-600 dark:bg-gray-700 dark:text-gray-400 rounded-xl">
                              <tr className='rounded-xl text-xs lg:text-sm '>
                                <th scope="col" className="lg:py-8 p-3 lg:px-1 text-center ">
                                  Image
                                </th>
                                <th scope="col" className="text-center ">
                                  Product
                                </th>
                                <th scope="col" className="text-center  ">
                                  Price
                                </th>
                                <th scope="col" className="text-center  ">
                                  Action
                                </th>
                                <th scope="col" className="text-center ">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                wishlistProducts?.data?.map((product) => (
                                  <tr key={product.id}>
                                    <td>
                                      <img src={product.imageCover} className="w-16 lg:w-32 max-w-full max-h-full mx-auto" alt={product.title} />
                                    </td>
                                    <td className="text-center font-semibold text-gray-900 dark:text-white">
                                      {product.title}
                                    </td>
                                    <td className=" text-center text-[12px] lg:text-sm font-semibold text-gray-900 dark:text-white">
                                      {product.price}
                                      <span className="ps-1">EGP</span>
                                    </td>
                                    <td className=" text-[12px] lg:text-sm text-center">
                                      <button onClick={() => removeProductFromWishlist(product.id)} className="font-medium text-red-600  dark:text-red-500 hover:underline"><i className="fa-solid fa-trash text-red-600 lg:text-2xl text-base"></i></button>
                                    </td>
                                    <td className=" text-[12px] lg:text-sm text-center">
                                    <button onClick={() => addWishedProductToCart(product.id)} className=' py-2 text-green-500 rounded '>
                                      <span className=' px-2 text-3xl'><i className="fa-solid fa-cart-plus "></i></span>
                                    </button>
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  ))}
        </div>
      </section>


    </>

  )
}
