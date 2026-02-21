

import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { use, useEffect, useState } from "react";
import Config from "../utils/Config.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsloader } from "../store/slices/isLoader.slice.jsx";
const Users=()=>{
    const [users, setUsers]=useState([]);
    const dispatch=useDispatch()
    console.log(users);
    
    useEffect(()=>{
      dispatch(setIsloader(true));
      axios
      .get("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/users", Config())
      .then((resp)=>setUsers(resp.data))
      .catch((error)=>console.log(error))
      .finally(()=>dispatch(setIsloader(false)));
    },[])
    return(
   <div className="flex justify-center items-center w-full px-2 sm:px-4">
      <div className="overflow-x-auto w-full max-w-5xl my-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <Table hoverable>
          <TableHead>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
  
              <TableHeadCell className="px-3 py-3 text-xs md:text-sm">Nombre</TableHeadCell>
              <TableHeadCell className="px-3 py-3 text-xs md:text-sm">Cedula</TableHeadCell>
              <TableHeadCell className="px-3 py-3 text-xs md:text-sm">Role</TableHeadCell>
              <TableHeadCell className="px-3 py-3">
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {users.map((user) => (
              <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <TableCell className="whitespace-nowrap px-3 py-4 text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-gray-500 font-normal md:hidden">{user.last_name}</span>
                    <span className="hidden md:inline">{user.last_name}</span>
                  </div>
                </TableCell>
                
                <TableCell className="whitespace-nowrap px-3 py-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {user.identity_document}
                </TableCell>
                
                <TableCell className="px-3 py-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-[10px] md:text-xs font-bold uppercase text-blue-700 dark:text-blue-300">
                    {user.role}
                  </span>
                </TableCell>
                
                <TableCell className="px-3 py-4 text-right">
                  <Link 
                    to={`/users/${user.id}`} 
                    className="inline-flex items-center font-bold text-red-600 hover:text-red-800 hover:underline text-xs md:text-sm"
                  >
                    Editar
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    )
}
export default Users;