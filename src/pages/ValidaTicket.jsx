import { useState } from 'react';
import ticketImg from '../assets/ticket.png';
import axios from 'axios';
import Config from '../utils/Config';
import toast, { Toaster } from 'react-hot-toast';
const soundSuccess = new Audio('/sounds/success.mp3');
const soundError = new Audio('/sounds/error.mp3');

const ValidaTicket = () => {
    const [code, setCode]= useState("");

    const TicketValidation = () => {
        
       axios
       .get(`http://localhost:3000/api/v1/ticket-seats/validate-ticket/${code}`, Config())
       .then((resp)=>{
        if(resp.data.valid){
            soundSuccess.play();
            toast.success(`¡Su codigo ${resp.data?.ticket?.code} es válido! Bienvenido.`, {
                duration: 4000,
                position: 'top-center',
                style: { background: '#10b981', color: '#fff', fontWeight: 'bold' },
            });
            
        } else {
            soundError.play();
            toast.error('Entrada inválida. Por favor, verifica el código e intenta nuevamente.', {
                duration: 4000,
                position: 'top-center',
                style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
            });
        }
       })
       .catch((error)=>{
        console.log(error);
        soundError.play();
        toast.error(`Entrada invalida. Verica el codigo de entrada  e intenta nuevamente.`, {
            duration: 4000,
            position: 'top-center',
            style: { background: '#C40C0C', color: '#fff', fontWeight: 'bold' },
        });
       })
       .finally(()=>setCode(""));
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center">
            <Toaster />
            {/* Icono visual opcional */}
            <div className="mb-4 flex justify-center">
                <div className="bg-red-100 p-4 rounded-full">
                    <img src={ticketImg} alt="Ticket" className="w-12 h-12" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Verifica tu Entrada
            </h2>
            
            <p className="text-slate-500 text-sm mb-6">
                Ingresa el código de 10 dígitos que aparece en tu comprobante para confirmar que tu cupo está disponible.
            </p>

            {/* Aquí iría tu input de validación */}
            <div className="space-y-4">
                <input 
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    type="text" 
                    placeholder="Escribe el código aquí..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-600 focus:outline-none transition-all text-center font-mono text-lg"
                />
                <button onClick={TicketValidation} disabled={!code || code.length < 10}
                  style={{opacity: !code || code.length < 10 ? 0.5 : 1}}
                   className="w-full bg-red-600 cursor-pointer text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors  font-mono text-lg shadow-lg">
                    Validar Ahora
                </button>
            </div>
        </div>
    );
}

export default ValidaTicket;