import axios from 'axios';
import {useEffect, useState } from 'react';
import { FaPlus, FaTrashAlt, FaTicketAlt, FaPalette } from 'react-icons/fa';
import { MdEventSeat, MdPayments } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { MdNumbers } from "react-icons/md";
import Config from '../utils/Config';
import { Alert } from "flowbite-react";


const SectionAreas = () => {
  const {id}=useParams();
  const idNumber=Number(id);
  const navigate = useNavigate(); 
  const [ticket, setTicket] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [sections, setSections] = useState([
    {
      nameSection: "",
      priceTicketSection:0,
      quantityTicket:0,
      color: "#DC0000",
      conditional: "numbered sead",
      optionsPay: "checks",
      eventId:Number(id)
    }
  ]);


  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...sections];

    if (name === 'quantityTicket' || name === 'priceTicketSection') {
        if (value === '') {
          newSections[index][name] = ''; 
        }else {
          newSections[index][name] = value; // Guardamos el valor tal cual para que React deje escribir
        }
    } else{
    newSections[index][name] = value;
    }
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        nameSection: "",
        priceTicketSection:Number(sections.priceTicketSection),
        quantityTicket:Number(sections.quantityTicket),
        color: "#DC0000",
        conditional: "numbered sead",
        optionsPay: "checks",
        eventId:Number(id)
      }
    ]);
  };

  const removeSection = (index) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSections = sections.map(s => ({
    ...s,
    priceTicketSection: Number(s.priceTicketSection).toFixed(2),
    quantityTicket: Number(s.quantityTicket),
    eventId: Number(id)
  }));

    const payload = { sectionsAreas: cleanSections };
    axios
    .post('https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/section-areas', payload, Config())
    .then(() =>{ 
      setAlert(true);
      setTimeout(()=>{

        navigate(`/discounts/event/${id}`);
      },1500);
      
    })
    .catch((error) =>{
       console.log(error)
       setErrorAlert(true);
    })
 
  };

  useEffect(()=>{
    axios
    .get(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/events/${id}`, Config())
    .then((resp) => setTicket(resp.data.quantity_ticket))
    .catch((error) => console.log(error))

  },[id])

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-600 text-white p-6 rounded-t-2xl shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
               Configuración de Secciones
            </h2>
            <p className="text-red-100 text-sm">Define áreas, precios y cantidades para este evento.</p>
          </div>
          <div className='flex items-center border-4 p-1.5 font-black tracking-widest  gap-2 rounded-2xl '>
            <MdNumbers size={30} /> 
            <h2>{ticket} TICKETS  MAXIMO</h2>
          </div>
          <button 
            type="button"
            onClick={addSection}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-all shadow-md"
          >
            <FaPlus /> Añadir Sección
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-2xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="border-2 border-gray-100 rounded-2xl p-5 relative bg-white hover:border-red-200 transition-colors shadow-sm"
              >
                <div className="absolute -left-3 top-4 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                {sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar sección"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                )}

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-1">
                      NOMBRE DE SECCIÓN
                    </label>
                    <input
                      type="text"
                      name="nameSection"
                      value={section.nameSection}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Ej: FRONT STAGE"
                      className="w-full border-b-2  border-gray-200 focus:border-red-500 outline-none py-1 text-lg font-semibold uppercase transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Precio</label>
                      <div className="relative">
                        <span className="absolute left-0 top-1 text-gray-400">RD$</span>
                        <input
                          type="number"
                          name="priceTicketSection"
                          value={section.priceTicketSection}
                          onChange={(e) => handleChange(index, e)}
                          min="0.00"
                          className="w-full border-b border-gray-200 pl-8 py-1 focus:border-red-500 outline-none"
                          placeholder="0.00"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Cantidad</label>
                      <input
                        type="number"
                        name="quantityTicket"
                        min="0.00"
                        value={section.quantityTicket }
                        onChange={(e) => handleChange(index, e)}
                        className="w-full border-b border-gray-200 py-1 focus:border-red-500 outline-none"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                      <FaPalette className="text-gray-400" />
                      <input
                        type="color"
                        name="color"
                        value={section.color}
                        onChange={(e) => handleChange(index, e)}
                        className="h-8 w-12 cursor-pointer border-none bg-transparent"
                      />
                      <span className="text-[10px] font-mono text-gray-500">{section.color}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      <MdEventSeat className="text-gray-400" />
                      <select 
                        name="conditional" 
                        value={section.conditional}
                        onChange={(e) => handleChange(index, e)}
                        className="bg-transparent text-xs outline-none w-full font-medium"
                      >
                        <option value="numbered sead">Numerado</option>
                        <option value="General admission">Entrada General</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            alert && (
              <Alert color="success">
                <span className="font-medium">¡Configuración Exitosa!</span> Las secciones del evento han sido creadas y guardadas correctamente.
              </Alert>
            )
          }
          {
            errorAlert && (
              <Alert color="failure">
                <span className="font-medium">Hubo un problema:</span> No pudimos guardar las secciones. Por favor, verifica que los precios y cantidades sean correctos.
              </Alert>
            )
          }

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="group relative cursor-pointer bg-red-600 text-white px-12 py-4 rounded-full font-black text-xl uppercase tracking-widest hover:bg-red-800 transition-all shadow-2xl hover:shadow-red-500/40"
            >
              Finalizar sección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionAreas;