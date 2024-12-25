import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";


interface User{
    id: string;
    name: string;
    email: string;
}
    
interface AuthContextType{
    userData: User | null;
    saveUserData: () => void;
}

export let AuthContext = createContext<AuthContextType | null >(null)

interface AuthContextProviderProps {
    children: ReactNode;
}

export default function AuthContextProvider({children}:AuthContextProviderProps) {

    let [userData,setUserData]=useState<User| null>(null)
    let saveUserData = () => {
        let encodedToken = localStorage.getItem("userToken")
        if (encodedToken) {
            let decodedToken = jwtDecode<User>(encodedToken)
        setUserData(decodedToken)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            saveUserData()
        }
    },[])
    


    return (
        <AuthContext.Provider value={{saveUserData,userData}}>
            {children}
        </AuthContext.Provider>
    )

}


