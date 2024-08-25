import { useContext, useEffect, useState } from 'react'
import classes from "./Product.module.css";
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';


export default function Product({ product }) {


  // const [isInWishlist, setIsInWishlist] = useState(false)
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistProducts= [], removeFromWishlist , getWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  async function addProductToCart(productId) {
    const res = await addToCart(productId);

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
        // setIsInWishlist(false);
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



  useEffect(() => {
    // Fetch wishlist again when component mounts
    getWishlist();
  }, [getWishlist]); 


  const isInWishlist = (productId) => wishlistProducts?.some(item => item.id === productId);


  return (
    <>
      <div className='w-full px-4 mb-6 pb-5 rounded-lg custom-product md:w-1/5' >
        <Link to={`/product-details/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} alt="" className='mb-2 mx-auto w-80 md:w-full  mt-2 h-80 object-cover ' />
          <div className='flex justify-between py-2'>
            <span className='text-gray-500 font-semibold'>{product.price} EGP</span>
            <div>
              <i className='fas fa-star text-yellow-300'></i>
              <span className='text-gray-500 font-semibold '>{product.ratingsAverage}</span>
            </div>
          </div>
          <span className='font-bold py-1 block text-green-600'>{product.category.name}</span>
          <h2 className="truncate font-bold mb-2 ">{product.title}</h2>

        </Link>

        <div className="flex justify-between text-center items-center flex-wrap ">
          <button onClick={() => addProductToCart(product.id)} className='w-5/6 bg-green-500 py-2 text-white rounded hover:bg-green-600 '>
            <span className=' px-2 text-xl'><i className="fa-solid fa-cart-plus"></i></span>
            Add To Cart
          </button>
          <div className="p-2 w-1/6">
            <button onClick={() => isInWishlist(product.id) ? removeProductFromWishList(product.id) : addProductToWishList(product.id)} className=' border border-green-500 p-2 rounded bg-green-500 hover:bg-green-600'>
              <i className={`fa-solid fa-heart text-xl ${isInWishlist(product.id) ? `text-red-500` : `text-white`} `}></i>
            </button>
          </div>

        </div>


      </div>

    </>


  )
}
