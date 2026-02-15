import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { setIsloader } from "../store/slices/isLoader.slice";
import { Outlet, useNavigate, Navigate } from "react-router-dom";


const RoleGuard =({allowedRoles})=>{
  const {user, loading}=useAuth();
  if(loading) return null;
  
  if(!user || !allowedRoles.includes(user.role)){
 
   return <Navigate to={"/login"} replace/> ;
  }
  return <Outlet />;
}

export default RoleGuard;