import axios from "axios";
import { createContext, useContext, useState,useEffect } from "react";
export const WishlistContext = createContext([])
import { AuthContext } from "./AuthContext";

export default function WishlistContextProvider({ children }) {



    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0)
    const { accessToken } = useContext(AuthContext);
    const [wishlistProducts, setwishlistProducts] = useState([])
    const endpoint = `https://ecommerce.routemisr.com/api/v1/wishlist`
    const headers = {
        token: accessToken
    }



    useEffect(() => {
        // Fetch the wishlist data on component mount
        if (accessToken) {
          getWishlist();
        }
      }, [accessToken]); // Only run this effect if the access token changes



    async function addToWishlist(productId) {
        try {
            const { data } = await axios.post(endpoint, { productId }, { headers });
            if (data.status === "success") {
                getWishlist() ;
            }
            return data;

        } catch (error) {
            console.log(error);
            return error

        }

    }

    async function removeFromWishlist(productId) {
        try {
            const { data } = await axios.delete(`${endpoint}/${productId}`, { headers });
            getWishlist() ;
            return data;

        } catch (error) {
            console.log(error);
            return error

        }
    }

    async function getWishlist() {
        try {
            const { data } = await axios.get(endpoint, { headers });
            
            if (data.status === "success") {
                                        
                setwishlistProducts(data.data)
                setNumOfWishlistItems(data.data.length);
            }
            return (data)
        } catch (error) {
            console.log(error);
            return (error)
        }
    }


    return <WishlistContext.Provider value={{ addToWishlist, wishlistProducts, getWishlist, removeFromWishlist, setwishlistProducts, numOfWishlistItems, setNumOfWishlistItems }}>
        {children}
    </WishlistContext.Provider>


}
