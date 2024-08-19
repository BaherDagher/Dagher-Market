import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext([])

export default function CartContextProvider({ children }) {
    const [cartId, setCartId] = useState(null)
    const [userId, setUserId] = useState(null)
    const { accessToken } = useContext(AuthContext);
    const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`
    const headers = {
        token: accessToken
    }
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartDetails, setCartDetails] = useState([])

    async function getCart() {
        try {
            let productsCount = 0;
            const { data } = await axios.get(endpoint, { headers })

            if (data.data.products.length === 0) {
                productsCount = 0;
                setNumOfCartItems(productsCount);
            }
            else {
                data.data.products.map((product) => {
                    productsCount += product.count;
                    setNumOfCartItems(productsCount);
                })
            }
            setCartDetails(data.data)
            setCartId(data.data._id);
            setUserId(data.data.cartOwner)
            return data
        } catch (error) {
            return error

        }
    }


    async function addToCart(productId) {
        let productsCount = 0;
        try {
            const { data } = await axios.post(endpoint, { productId }, { headers });
            if (data.data.products.length === 0) {
                productsCount = 0;
                setNumOfCartItems(productsCount);
            }
            else {
                data.data.products.map((product) => {
                    productsCount += product.count;
                    setNumOfCartItems(productsCount);
                })
            }

            // setNumOfCartItems(data.numOfCartItems);
            console.log(data);
            setCartId(data.data._id)
            setUserId(data.data.cartOwner)

            setCartDetails(data.data)
            return data;

        } catch (error) {
            console.log(error);
            return error;

        }
    }

    async function removeFromCart(productId) {
        try {
            let productsCount = 0;
            const { data } = await axios.delete(`${endpoint}/${productId}`, { headers });
            if (data.data.products.length === 0) {
                productsCount = 0;
                setNumOfCartItems(productsCount);
            }
            else {
                data.data.products.map((product) => {
                    productsCount += product.count;
                    setNumOfCartItems(productsCount);
                })
            }
            setCartId(data.data._id)
            setUserId(data.data.cartOwner)
            setCartDetails(data.data)
            return data

        } catch (error) {
            console.log(error);
            return error;

        }
    }

    async function updateQuantity(productId, count) {
        try {
            let productsCount = 0;
            const { data } = await axios.put(`${endpoint}/${productId}`, { count }, { headers });
            if (data.data.products.length === 0) {
                productsCount = 0;
                setNumOfCartItems(productsCount);
            }
            else {
                data.data.products.map((product) => {
                    productsCount += product.count;
                    setNumOfCartItems(productsCount);
                })
            }
            setCartId(data.data._id)
            setUserId(data.data.cartOwner)
            setCartDetails(data.data)
            return data

        } catch (error) {
            console.log(error);
            return error;

        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete(endpoint, { headers })
            setNumOfCartItems(0);
            
            return data;


        } catch (error) {
            console.log(error);

        }
    }



    async function getPayment(url, shippingAddress) {
        try {
            const { data } = await axios.post(url, { shippingAddress }, { headers })
            // setUser(data.data.user);
            console.log(data);
            
            return data;

        } catch (error) {
            console.log(error);
            // return error.response.data.message
        }
    }

    useEffect(() => {
        accessToken && getCart()
    }, [accessToken])



    return <CartContext.Provider value={{ addToCart, getCart, cartDetails, numOfCartItems, setNumOfCartItems, removeFromCart, updateQuantity, getPayment, cartId, userId, clearCart }}>
        {children}
    </CartContext.Provider>

}