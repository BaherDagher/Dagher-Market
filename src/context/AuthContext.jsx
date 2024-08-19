import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    console.log(accessToken);
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAccessToken(localStorage.getItem("accessToken"))
        }
    },
        [])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}