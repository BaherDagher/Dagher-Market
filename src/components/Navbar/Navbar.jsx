import { useEffect, useState, useContext } from 'react'
import classes from "./Navbar.module.css";

import logo from "../../assets/FreshCartLogo.png"
import { Link, NavLink } from 'react-router-dom';
import Register from '../Register/Register';
import { initFlowbite } from 'flowbite'
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accessToken, setAccessToken } = useContext(AuthContext)
  const { numOfWishlistItems, setNumOfWishlistItems } = useContext(WishlistContext)
  const { numOfCartItems } = useContext(CartContext)

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setIsMenuOpen(false); // Close menu on logout

  }

  useEffect(() => {
    initFlowbite();
  }, [accessToken])

  return (
    <div className="container mx-auto ">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 left-0 right-0 top-0 fixed z-50 px-[50px]">
        <div className="flex flex-wrap mx-auto p-4 justify-between">
          <div className='w-1/6 '>
            <Link to={'/home'} onClick={() => setIsMenuOpen(false)}>
              <a href='' className="flex items-center space-x-3 rtl:space-x-reverse ">
                <i className="fa-solid fa-shop text-3xl text-green-500"></i>
                <span className="self-center md:text-base xl:text-2xl font-semibold whitespace-nowrap dark:text-white  ">DagherMarket</span>
              </a>
            </Link>

          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen ? "true" : "false"} onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={` ${isMenuOpen ? " q" : "hidden"}  w-5/6 lg:flex  mx-auto  flex-wrap flex-row py-1 `} id="navbar-default">
            {<div className='text-center '>
              <ul className='flex flex-col lg:flex-row '>
                <li className='my-3 lg:my-0'>
                  <NavLink className="p-2" to={"/home"} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                </li>

                <li className='my-3 lg:my-0'>
                  <NavLink className="p-2" to={"/products"} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
                </li>
                <li className='my-3 lg:my-0'>
                  <NavLink className="p-2" to={"/categories"} onClick={() => setIsMenuOpen(false)}>Categories</NavLink>
                </li>
                <li className='my-3 lg:my-0'>
                  <NavLink className="p-2" to={"/brands"} onClick={() => setIsMenuOpen(false)}>Brands</NavLink>
                </li>
                {accessToken &&
                  <>
                    <li className='my-3 lg:my-0'>
                      <NavLink className="p-2" to={"/wishlist"} onClick={() => setIsMenuOpen(false)}>
                        <button type="button" className="relative inline-flex  items-center text-sm font-medium text-center text-black rounded-lg ">
                          <i className="fa-solid fa-heart text-3xl "></i>
                          <span className="sr-only">Notifications</span>
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{numOfWishlistItems}</div>
                        </button>

                      </NavLink>
                    </li>
                    <li className='my-3 lg:my-0'>
                      <NavLink className="p-2" to={"/cart"} onClick={() => setIsMenuOpen(false)}>
                        <button type="button" className="relative inline-flex  items-center text-sm font-medium text-center text-black rounded-lg ">
                          <i className="fa-solid fa-cart-shopping text-3xl "></i>
                          <span className="sr-only">Notifications</span>
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{numOfCartItems}</div>
                        </button>

                      </NavLink>
                    </li>
                  </>
                }
              </ul>
            </div>}
            <div className='ms-auto  sm:text-center'>
              <ul className='flex flex-col lg:flex-row text-center '>
                {
                  accessToken ? (
                    <>
                      <li className='my-3 lg:my-0'>
                        <Link className="p-2" onClick={handleLogout}>Logout</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='my-3 lg:my-0'>
                        <NavLink className="p-2" to={"/login"} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                      </li>
                      <li className='my-3 lg:my-0'>
                        <NavLink className="p-2" to={"/register"} onClick={() => setIsMenuOpen(false)}>Register</NavLink>
                      </li>
                    </>

                  )
                }
                <li className='my-3 lg:my-0'>
                  <a href="https://www.facebook.com" className='fab fa-facebook mx-2'></a>
                  <a href="https://www.linkedin.com" className='fab fa-linkedin-in mx-2'></a>
                  <a href="https://www.youtube.com" className='fab fa-youtube mx-2'></a>
                  <a href="https://www.instagram.com" className='fab fa-instagram mx-2'></a>
                  <a href="https://www.tiktok.com" className='fab fa-tiktok mx-2'></a>
                </li>
              </ul>
            </div>
          </div>
        </div >

      </nav>

    </div>
  )
}