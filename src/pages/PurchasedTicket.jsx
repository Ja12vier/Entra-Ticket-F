import axios from "axios";
import { useDispatch } from "react-redux";
import Config from "../utils/Config";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import html2canvas from "html2canvas";
import { setIsloader } from "../store/slices/isLoader.slice";
import { Button} from "flowbite-react";
import ResaleTicket from "../componenst/ResaleTicket";



const purchasedTicket = () => {
  const dispatch=useDispatch();
  const [carts, setCarts]=useState([]);
  const ticketRef= useRef({});
  const [openModal, setOpenModal] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios
    .get("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/shopping", Config())
    .then((resp)=>setCarts(resp.data))
    .catch((err)=>console.log(err));
    
  }, [])
 const downloadTicket = async (ticket, index) => {
    dispatch(setIsloader(true));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const element = ticketRef.current[index];
    if (!element) {
      dispatch(setIsloader(false));
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const link = document.createElement("a");
    link.download = `ticket-${ticket.code}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    dispatch(setIsloader(false));
  };

  const handleOpenModal = (id, price) => {
    setTicketId(id);
    setPrice(price);
    setOpenModal(true);
  }

  
  return (
   <div>
       {
        carts.map((cart)=>(
            cart.ticketSeats.map((ticket, index)=>(
             <div key={ticket.id} className="relative group">
              <div>
                  <button
                  onClick={() => downloadTicket(ticket, index)}
                  className="absolute flex justify-center items-center gap-2  top-15 right-3 z-10 hover:scale-105 hover:bg-amber-400 cursor-pointer
                  bg-black text-white text-xs px-3 py-2 rounded-lg
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300"
                >
                  <AiOutlineArrowDown />
                  Descargar
                </button>
                 <button onClick={() => handleOpenModal(ticket.id, ticket.price)}
                  className="absolute flex justify-center items-center gap-2  bottom-15 right-3  z-10 hover:scale-105 hover:bg-amber-400 cursor-pointer
                  bg-black text-white text-xs px-6 py-2 rounded-lg
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300"
                  >
                    Revender
                 </button>
              </div>
              

              
            
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

                    <ResaleTicket 
                      openModal={openModal} 
                      setOpenModal={() => setOpenModal(false)} 
                      id={ticketId}
                      price={price}
               
                    />

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
         ))
        ))
       }
</div>
  )
}

export default purchasedTicket;