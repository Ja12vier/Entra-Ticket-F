import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../utils/Config";
import { Alert } from "flowbite-react";
import { Label, Select } from "flowbite-react";
import { setShowCart } from "../store/slices/showCart.slice";
import { getCartThunk } from "../store/slices/cart.slice";
import { setIsloader } from "../store/slices/isLoader.slice";


const EventDetails = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();
    const [event, setEvent]=useState({});
    const [areaQuantitiTicket, setAreaQuantitiTicket]=useState([{id:0, value:0}]);
    const [alertError, setAlertError]=useState(false);
    const [areas, setAreas]=useState({});
   
    useEffect(()=>{
        axios
        .get(`http://localhost:3000/api/v1/events/${id}`)
        .then((resp) =>setEvent(resp.data))
        .catch((error) => console.log(error))
    }, [id]);
    const sectionAreas=event.section_areas;

    const handleSelectQuantitiTicket=({e, id})=>{
      const value=parseInt(e.target.value);
      setAlertError(false); 
      setAreaQuantitiTicket((areaTicket)=>{
       const exist= areaTicket.find((area)=>area.id===id);
        if(exist){
            return areaTicket.map((area)=>
                area.id == id ? {...area, value:value} : area
            )
        }else{
            return [...areaTicket, {id, value}]
        }
      });

    }
    
   const addCart=()=>{
    areaQuantitiTicket.forEach((area)=>{
        if(area.value !== 0){
            const section = sectionAreas.find((a)=> a.id == area.id);
            if(area.value > section.quantityAvailable){ 
               setAreas(section)
               setAlertError(true);
               return;
            }

            for(let i= 0; i < area.value; i++){
             console.log("se ejecuto");
             const data={
                areaId:area.id,
                numberTable:i + 1
             };
                dispatch(setIsloader(true));
             axios
             .post("http://localhost:3000/api/v1/ticket-seats",data ,Config())
             .then(() =>{
               dispatch(getCartThunk()),
               dispatch(setShowCart(true)),
               setAreaQuantitiTicket([{id:0, value:0}])
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
        }
    });
    
   }

   
    return (
     <div className="flex justify-center items-center flex-col">
         <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[99%] h-80 md:100 xl:h-150 max-w-6xl mx-auto my-6 rounded-lg relative border overflow-hidden">
            <img 
                className="object-contain aspect-square opacity-70 mask-radial-at-center mask-radial-from-76% mask-radial-to-86% w-full h-full rounded-lg" 
                src={event.imageUrl} 
                alt="portada-imagen" 
            /> 
            <Link 
                to={`/ticket-rebend-event/${id}`} 
                className="border-2 px-3 py-2 md:px-4  md:py-3 rounded-xl border-lime-500 cursor-pointer bg-lime-500 absolute
                          bottom-4 md:bottom-[12.5%] left-1/2 transform -translate-x-1/2 text-sm md:text-xl font-bold text-white font-mono hover:bg-lime-600 whitespace-nowrap"
            >
                Ticket en Reventa
            </Link>
        </div>
         <div className="text-center" >
            <h2 className="text-center font-serif  font-semibold text-3xl md:text-4xl xl:text-5xl">{event.name_event}</h2>
            <br />
            <p className="text-lg max-w-300 text-black/60 font-serif p-4">{event.comment}</p>
         </div>
         <div className="mb-60">
            <h3 className="font-serif font-semibold text-center mb-4 text-2xl md:text-3xl xl:text-4xl">Ubicación del Evento</h3>
           <iframe
            src={event.mapUrl}
            width="1400"
            height="450"
            style={{border:0}} 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>
         </div>
    <div className="my-8 flex justify-center w-full px-4 "> 
     <div className="w-full  max-w-2xl overflow-hidden rounded-2xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-[1fr_120px_100px] items-center px-6 h-12 bg-black text-white font-bold text-xs tracking-widest uppercase">
        <span>ZONA</span>
        <span className="text-center">PRECIO</span>
        <span className="text-right">CANTIDAD</span>
      </div>

      <div className="flex flex-col gap-0.5  bg-white">
        {sectionAreas?.map((area) => {
          const currentValue = areaQuantitiTicket.find((a) => a.id === area.id);
          const valorActual = currentValue ? currentValue.value : 0;
        
        return (
          <div 
            key={area.id} 
            className="grid grid-cols-[1fr_120px_100px] items-center px-2 sm:px-4 md:px-6 h-16 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200 text-gray-800 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-2 md:gap-4">
              <div 
                style={{ backgroundColor: area.color }} 
                className="w-6 h-6 rounded-lg border border-black/10 shadow-sm shrink-0"
              ></div>
              <span className="font-bold text-[12px] md:text-sm uppercase tracking-tight font-sans truncate">
                {area.nameSection}
              </span>
            </div>

            <div className="font-bold text-base md:text-[10px]  text-[10px] text-gray-700 text-center">
              <span className="md:text-[10px]  text-[6px] mr-1 opacity-60">RD$</span>
              {area.priceTicketSection}
              
            </div>

             <div className="flex justify-end">
                <select 
                    onChange={(e) => handleSelectQuantitiTicket({ e, id: area.id })}
                    value={valorActual}
                    required  
                    className="w-20 h-10 px-2 rounded-xl border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer"
                >
                    {[...Array(11).keys()].map(num => (
                    <option key={num} value={num}>{num}</option>
                    ))}
                </select>
               </div>
             </div>
             );
           })}
         </div>
        </div>
      </div>

        {alertError && <Alert color="failure">
        <span className="font-medium">Error!  </span>La zona {areas.nameSection} solo tiene {areas.quantityAvailable} asientos disponibles no se pudo agragar al carrito
        </Alert>}

            <div className="flex flex-col md:flex-row justify-between items-center border-2 border-gray-200 gap-4 w-full max-w-4xl py-4 mb-6 px-4 rounded-sm bg-gray-200 mx-auto">
              <div className="text-center md:text-left">
                  <p className="text-sm md:text-base font-medium text-gray-700">
                      Estos valores incluyen cargo por servicios adicionales
                  </p>
              </div>
              <div className="w-full md:w-auto">
                  <button
                      onClick={addCart}
                      disabled={areaQuantitiTicket.map((v) => v.value).reduce((a, b) => a + b) === 0}
                      style={{ opacity: areaQuantitiTicket.map((v) => v.value).reduce((a, b) => a + b) === 0 ? 0.5 : 1 }}
                      className="w-full md:w-auto bg-lime-600 hover:bg-lime-800 cursor-pointer text-white font-bold py-2.5 px-6 rounded transition-colors duration-200"
                  >
                      Agregar al Carrito
                  </button>
              </div>
          </div>
     </div> 
     
        
    )
}

export default EventDetails;