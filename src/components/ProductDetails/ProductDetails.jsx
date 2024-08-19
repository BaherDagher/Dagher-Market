import { useContext, useEffect, useState } from 'react'
import classes from "./ProductDetails.module.css";
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../context/WishlistContext';


export default function ProductDetails() {
  const [isWishList, setisWishList] = useState(false)
  const navigate = useNavigate();
  const { addToWishlist, wishlistProducts, getWishlist, removeFromWishlist } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getProductDetails(id) {
    setisLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      setError(null);

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProductDetails({});
    } finally {
      setisLoading(false);
    }
  }


  async function addProductToWishList(productId) {
    const res = await addToWishlist(productId);

    if (res.status === "success") {
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

  async function removeProductFromWishList(productId) {
    const res = await removeFromWishlist(productId)
    if (res.status === "success") {
      toast.success("Product removed successfully from your wishlist"
        , {
          position: 'top-right',
          autoClose: 1000,

        });
      setisWishList(false);
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


  const isInWishlist = (productId) => wishlistProducts.some(item => item.id === productId);



  useEffect(() => {
    // Scroll to the top of the page whenever the id changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })


  useEffect(() => {
    getProductDetails(id);
  }, [id])

 


  async function addProductToCart(productID) {
    const res = await addToCart(productID);
    console.log(res);

    if (res.status === "success") {
      toast.success(res.message, {
        position: 'top-right',
        autoClose: 1500,

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
    document.title = "Product Details Page"
  },[])

  return (
    <>


      <section className='md:py-2  py-1 min-h-[calc(100vh-124px)] px-16'>
        <div className="container mx-auto px-4 md:px-0">{
          isLoading ? (<Loader />) :
            error ?
              (<div className='alert'>{error}</div>
              ) : (
                <div className="row items-center ">
                  <div className="md:w-2/3 md:order-1 px-4 w-full order-2 pt-16 lg:pt-0">
                    <h1 className='text-2xl mb-2'>{productDetails?.title}</h1>
                    <p className='mb-2  text-gray-500 font-light'>{productDetails.description}</p>
                    <div className='flex justify-between py-2 text-gray-500 font-light mb-2'>
                      <div>
                        <p>{productDetails?.category?.name}</p>
                        <span className='text-gray-500 font-semibold'>{productDetails.price} EGP</span>
                      </div>
                      <div>
                        <i className='fas fa-star text-yellow-300'></i>
                        <span className='text-gray-500 font-semibold '>{productDetails.ratingsAverage}</span>
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="lg:w-[70%] md:w-[50%]  w-[45%]">
                        <button onClick={() => addProductToCart(productDetails.id)} className='w-full bg-green-500 py-2 text-white rounded hover:bg-green-600 '>
                          <span className=' px-2 text-xl'><i className="fa-solid fa-cart-plus"></i></span>
                          Add To Cart
                        </button>
                      </div>

                      <div className=" lg:w-[30%] md:w-[50%]  w-[55%] text-end">
                        <button onClick={() => isInWishlist(productDetails.id) ? removeProductFromWishList(productDetails.id) : addProductToWishList(productDetails.id)} className=' border border-green-500 p-2 rounded bg-green-500 hover:bg-green-600 text-white'>
                          {isInWishlist(productDetails.id) ? `Remove From Wishlist` : `Add To Wishlist`}
                          <i className={`ms-2  fa-solid fa-heart text-xl ${isInWishlist(productDetails.id) ? `text-red-500` : `text-white`} `}></i>
                        </button>
                      </div>

                    </div>
                  </div>



                  <div className="md:w-1/3 md:order-2 px-4 order-1 w-80 mx-auto">
                    <Slider {...settings}>
                      {
                        productDetails?.images?.map((image, index) => (
                          <img src={image} alt={productDetails?.title} key={index} />))
                      }
                    </Slider>
                  </div>

                </div>
              )
        }



        </div>
      </section>

      <RelatedProducts />
    </>

  )
}
