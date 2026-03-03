import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const dispatch=useDispatch();
    const [user, setUser]=useState(null);
    const [token, setToken]=useState(localStorage.getItem("token"));
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        if(!token){
            setLoading(false);
            return;
        }
         axios
         .get("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/users/me",{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })
         .then((resp)=>setUser(resp.data))
         
         .catch((error)=>{
            logout();
            console.log("Token expirado",error);
         })
         .finally(()=>setLoading(false));

    },[token]);

    const login=(newToken, userData)=>{
      localStorage.setItem("token", newToken);
       setToken(newToken);
       setUser(userData);
    }

    const  logout=()=>{
        localStorage.removeItem('token')
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