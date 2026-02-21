


import axios from "axios";
import { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { HiOutlineBadgeCheck, HiOutlineCurrencyDollar } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import Config from "../utils/Config";
import ticketpng from "../assets/ticket.png";

const ResaleTicket = ({ openModal, setOpenModal, id, price }) => {
  const [newPrice, setNewPrice] = useState("");

  const handleResale = () => {
    console.log(price, newPrice);
    
    if (Number(price) > Number(newPrice)) return toast.error("El nuevo precio, no puede ser menor al precio original");
    axios
      .patch(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/ticket-seats/${id}/resale`, { resalePrice: newPrice }, Config())
      .then(() => {
        toast.success("Ticket puesto en reventa correctamente");
        setTimeout(() => {
                  setOpenModal(false);
        }, 2500);
      })
      .catch((err) => {
        console.error(err);
        if(err.status === 404){
          return toast.error("Este ticket ya fue usado, no se puede poner en reventa");
        }else{
          toast.error("Error al procesar la reventa");
        }
        
      });
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Toaster/>
        <div className="text-center px-2 pb-4">
          <div className="mx-auto mb-4 bg-red-100 w-16 h-16 rounded-full flex items-center justify-center">
            <img src={ticketpng} className="h-10 w-10 text-red-600" />     
          </div>
          <toast/>
          <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
            Poner en Reventa
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Estás a punto de listar tu ticket para que otros usuarios puedan comprarlo.
          </p>

          <div className="bg-slate-200 p-4 rounded-2xl border border-slate-100 mb-6 flex justify-around items-center">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400">Precio Original</span>
              <p className="text-lg font-bold text-slate-400">RD$ {price}</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200"></div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-red-500">Nuevo Precio</span>
              <p className="text-lg font-bold text-red-600">RD$ {newPrice || "0"}</p>
            </div>
          </div>

          <div className="text-left mb-6">
            <div className="mb-2 block">
              <Label htmlFor="price" value="¿A qué precio deseas venderlo?" className="font-semibold" />
            </div>
            <TextInput
              id="price"
              type="number"
              placeholder="Ej: 2500"
              icon={HiOutlineCurrencyDollar}
              required
              min="0"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              color="failure" 
              className="bg-red-600 cursor-pointer"
              onClick={handleResale}
              disabled={!newPrice}
            >
              Confirmar Reventa
            </Button>
            <button 
              onClick={() => setOpenModal(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>

    </Modal>
  );
};

export default ResaleTicket;