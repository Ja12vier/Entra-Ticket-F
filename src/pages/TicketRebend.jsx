
import axios from "axios";
import { useDispatch } from "react-redux";
import Config from "../utils/Config";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import html2canvas from "html2canvas";
import { setIsloader } from "../store/slices/isLoader.slice";
import ticketImg from "../assets/ticket.png";
import { useParams } from "react-router-dom";
import { setShowCart } from "../store/slices/showCart.slice";
import { getCartThunk } from "../store/slices/cart.slice";

const ticketRebend = () => {
  const dispatch=useDispatch();
  const {id}=useParams();
  const [carts, setCarts]=useState([]);
  const ticketRef= useRef({});
  const [ticket, setTicket] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios
    .get("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/ticket-seats/ticket-resale-all", Config())
    .then((resp)=>setTicket(resp.data))
    .catch((err)=>console.log(err));
    
  }, [id])

const addCart=(ticketId)=>{
    console.log(ticketId);
    dispatch(setIsloader(true));
        axios
        .get(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/ticket-seats/${ticketId}/add-cart`, Config())
        .then(() =>{
        console.log("se agrego a cart");
        
        dispatch(getCartThunk()),
        dispatch(setShowCart(true))
    })
        .catch((error)=>{
        console.log(error)
        if(error.response.status === 401){
            navigate("/login");
        }
        })
        .finally(()=>{
        setTimeout(()=>{
        
        window.scrollTo({
        top:0,
        behavior:"smooth"
        })
        dispatch(setIsloader(false));
        },500);
      })
    }
  const tickets=ticket.filter((tick)=>tick.sectionArea?.eventId == Number(id)) || [];
  console.log(tickets);
  
  return (
   <div className="bg-gray-100 min-h-[400px] pb-10">
  <h2 className="text-center py-10 text-red-600 text-xl font-mono">
    ¡Última oportunidad!
    <span className="text-2xl text-black font-bold font-mono block md:inline"> 
      Encuentra tickets disponibles de otros fans.
    </span>
  </h2>

  {tickets.length > 0 ? (
    tickets.map((ticket, index) => (
      <div key={ticket.id} className="relative group">
        <div key={ticket.id} className="relative group">
             <button
                onClick={() => addCart(ticket.id)}
                className="absolute flex justify-center items-center gap-2  top-1/2 right-36 z-10 hover:scale-105 hover:bg-lime-500 cursor-pointer
                bg-black text-white  px-3 py-2 font-bold font-mono text-lg rounded-lg
                opacity-0 group-hover:opacity-100
                transition-all duration-300"
                >
                Agregar al Carrito
             </button>
    
            <div   ref={(el) => (ticketRef.current[index] = el)} style={{ background: ticket.color }} className={` w-full max-w-3xl mx-auto my-6 border-2 rounded-xl shadow-2xl overflow-hidden flex`}>
                <div className="flex-1 p-5 text-black relative">  
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-extrabold uppercase">
                            {ticket.nameEvent}
                        </h2>
                        <span className="text-md font-bold border border-black px-2 py-1">
                            {ticket.type}
                        </span>
                    </div>
                  <div className="flex gap-4 mt-4">
                    <img
                        src={ticket.imageUrl}
                        alt={ticket.nameEvent}
                        className="w-32 h-30 object-cover rounded-md border"
                    />

                    <div className="text-md space-y-1">
                        <p><b>Código:</b> {ticket.code}</p>
                        <p><b>Mesa:</b> #{ticket.numberTable}</p>
                        <p><b>Precio:</b> RD$ {ticket.price}</p>
                        <p><b>Reservado:</b> {ticket.reservedBy}</p>
                        <p className="text-xl font-mono text-gray-800">
                        Expira: {new Date(ticket.expiresAt).toLocaleDateString()}
                        </p>
                    </div>
                 </div>

                 <div className="mt-4 text-xs font-bold border-t border-black pt-2">
                ⚠️ ESTE TICKET ES VÁLIDO SOLO UNA VEZ
                 </div>
                </div>

                <div className="w-6 flex items-center justify-center">
                    <div className="h-full border-l-2 border-dashed border-black"></div>
                </div>

                <div className="w-48 bg-black text-white flex flex-col items-center justify-center p-4">
                    <img
                    src={ticket.codeQr}
                    alt="QR Ticket"
                    className="w-32 h-32 bg-white p-2 rounded"
                    />

                    <p className="text-xs mt-3 text-center">
                      Escanea este código en la entrada
                    </p>
                </div>
             </div>
          </div>  
      </div>
    ))
  ) : (
    <div className="max-w-xl mx-auto border-2 border-dashed border-gray-400 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm shadow-sm">
      <div className="bg-gray-200 p-4 rounded-full mb-4">
          <img className="w-20 h-20" src={ticketImg} alt="ticket" />
      </div>
      
      <h3 className="text-xl font-mono font-bold text-gray-800 uppercase tracking-tighter">
        No hay reventas activas
      </h3>
      
      <p className="text-gray-500 font-mono mt-2 max-w-xs">
        En este momento no hay fans vendiendo sus asientos. ¡Vuelve a revisar en unos minutos!
      </p>
    </div>
  )}
</div>

  )
}

export default ticketRebend;

