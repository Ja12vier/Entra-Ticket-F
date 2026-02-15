import axios from "axios";
import { use, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setIsloader } from "../store/slices/isLoader.slice";
import Config from "../utils/Config";
import { getCartThunk } from "../store/slices/cart.slice";


const ChekoutSuccess = () => {
    const [searchParams]=useSearchParams();
    const token=searchParams.get("token");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const hasExecuted=useRef(false);
    
    useEffect(()=>{
      if(hasExecuted.current) return;
      dispatch(setIsloader(true));
      if(token){
        hasExecuted.current=true;
        axios.post(`http://localhost:3000/api/v1/paypals/capture-order?token=${token}`, {},   Config())
        .then(res => {
            console.log(res.data);
            if (res.data.status === "COMPLETED") {
                  setTimeout(() => navigate("/purchased-ticket"), 2000);
               
            }
         })
        .catch((error) =>{
            const errorStatus=error.response?.status;
            if(errorStatus == 422){
              setTimeout(() => navigate("/purchased-ticket"), 2000);
            }
            
            console.log("Destalle del error", error);
   
        })
        .finally(() => dispatch(setIsloader(false)));

      }

    },[token]);
    return (
      <div className="flex flex-col items-center justify-center p-20 font-mono">
        <h1 className="text-4xl font-black text-green-500 uppercase italic">¡Pago Exitoso!</h1>
        <p className="mt-4 text-gray-600">Tu orden #{token} ha sido confirmada.</p>
        <p className="mt-2 text-sm text-gray-400 italic">Redirigiéndote a tus tickets...</p>
      </div>
    )
}

export default ChekoutSuccess;