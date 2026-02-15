import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user, setUser]=useState(null);
    const [token, setToken]=useState(localStorage.getItem("token"));
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
         axios
         .get("http://localhost:3000/api/v1/users/me",{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })
         .then((resp)=>setUser(resp.data))
         .catch((error)=>{
            console.log("Token expirado",error);
            logout();
         })
         .finally(()=>setLoading(false));
    },[token]);

    const login=(newToken, userData)=>{
      localStorage.setItem("token", newToken);
       setToken(newToken);
       setUser(userData);
    }

    const  logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const value={
        user,
        token,
        loading,
        login,
        logout

    }

 
    return(
       <AuthContext.Provider value={value}>
        {!loading && children}
       </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context= useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}