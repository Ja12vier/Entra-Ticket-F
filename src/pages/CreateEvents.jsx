

import { Button, Card, Checkbox, FileInput, Label,Select ,Textarea,TextInput } from "flowbite-react";
import axios from "axios";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Config from "../utils/Config";



const CreateEvents=()=>{
     const navigate= useNavigate();
  const [showAlert, setShowAlert]=useState(false);
  const handleSubmit =(e)=>{
    e.preventDefault(); 
    const formData = new FormData();
;
    const data = {
      applicant:e.target.nameOrganizer.value, 
      phone:e.target.phone.value,
      name_event:e.target.nameEvent.value,
      place:e.target.lugar.value,
      place_event:e.target.direction.value,
      ballot_type:e.target.typeBallot.value,
      sale_online:e.target.saleOnline.checked,
      sale_online_other:e.target.saleOnlineOther.checked,
      discount:e.target.discount.checked,
      type_event:e.target.typeEvent.value,
      date_event:e.target.dateEvent.value,
      hour_event:e.target.hourEvent.value,
      comment:e.target.description.value,
      quantity_ticket:e.target.quantityTicket.value,
      File:e.target.file.files[0],
      mapUrl:e.target.mapUrl.value
    };
    Object.keys(data).forEach(key =>{
      if(key  != 'File'){
        formData.append(key, data[key]);
      }
    })
    if(data.File){
    formData.append('File', data.File);
    }

     axios 
     .post("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/events/upload", formData, Config(),)
     .then((resp)=>{
      setShowAlert(true);
      console.log(resp.data);
      setTimeout(() => {
        navigate(`/section-areas/${resp.data.id}`);
      }, 3000);
     })
     .catch((error)=>{
      console.log(error);
      setTimeout(() => {
        navigate("/error-autentificacion");
      }, 1000);
    });
  }
     return (
        <div className="flex justify-center items-center bg-gray-100">
          
          <div className=" my-20  w-170 shadow-2xl rounded-3xl ">
            <div className="flex justify-center items-center text-2xl font-black tracking-wider uppercase bg-red-600  text-white h-26 rounded-t-3xl w-full">
              <h2 >Ficha de creacion de evento</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-10 px-4">
                <div>
                <div className="mb-2  block">
                  <Label htmlFor="nameOrganizer">Nombre del Organizador</Label>
                </div>
                <TextInput id="nameOrganizer" type="text" placeholder="Javier Nuñez" required />
              </div>
                <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone">Telefono</Label>
                </div>
                <TextInput id="phone" type="tel" placeholder="809-484-1713" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="nameEvent">Nombre del evento</Label>
                </div>
                <TextInput id="nameEvent" type="text" placeholder="Jose en concierto" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lugar">Lugar del evento</Label>
                </div>
                <TextInput id="lugar" type="text" placeholder="Teatro coliseo de santiago" required />
              </div>
              <div>
                <div className="mb-2  block">
                  <Label htmlFor="direction">Direccion del evento</Label>
                </div>
                <TextInput id="direction" type="text" placeholder="Direccion del evento" max={13} min={11} required />
              </div>
              <div>
                <div className="mb-2  block">
                  <Label htmlFor="typeBallot">Tipo de boleta</Label>
                </div>
                <Select id="typeBallot" required>
                    <option></option>
                    <option>sale</option>
                    <option>printing service</option>
                </Select>
              </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="saleOnline" />
                    <Label htmlFor="saleOnline">¿Venta de boletas Online?</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="saleOnlineOther" />
                    <Label htmlFor="saleOnlineOther">¿Venta de boletas  Online y de mas punto?</Label>
                  </div>
                    <div className="flex items-center gap-2">
                    <Checkbox id="discount" />
                  <Label htmlFor="discount">¿Habra descuentos?</Label>
                  </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="typeEvent">Tipo de evento</Label>
                </div>
                <Select id="typeEvent" required>
                    <option></option>
                    <option>Arts and theater</option>
                    <option>concert</option>
                    <option>Conference</option>
                    <option>Educational</option>
                    <option>Events</option>
                    <option>Children</option>
                </Select>
              </div>
               <div>
                  <div className="mb-2 block">
                    <Label htmlFor="dateEvent">Fecha deL Evento</Label>
                  </div>
                  <TextInput id="dateEvent" type="date" placeholder="2025-08-26" required />
               </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="hourEvent">Hora del Evento</Label>
                </div>
                <TextInput id="hourEvent" type="text" placeholder="14:00:00" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description">Descripcion</Label>
                </div>
                <Textarea id="description" placeholder="El Miércoles 31 Diciembre, 20:00 - 23:00 hrs. (República Dominicana)..." required rows={4} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="quantityTicket" >Cantidad de boletas</Label>
                </div>
                <TextInput id="quantityTicket" type="number" placeholder="1000" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label className="mb-2 block" htmlFor="file">Flyer o logo del evento</Label>
                </div>
                 <FileInput id="file" />
              </div>
               <div>
                <div className="mb-2 block">
                  <Label htmlFor="mapUrl">Mapa del evento (URL)</Label>
                </div>
                <TextInput id="mapUrl" type="url" placeholder="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.890646011729!2d-70.27279927421874!3d19.28712113783197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0" required />
              </div>
            <Button type="submit" className="hover:shadow-2xl font-black tracking-wider cursor-pointer bg-red-600 text-white text-lg uppercase hover:bg-red-800">Crear Evento</Button>
          </form>
        {showAlert && (
        <Alert color="info" onDismiss={() => setShowAlert(false)}>
          <span className="font-medium">¡Registro exitoso!</span>El usuario se ha registrado con exito.
        </Alert>
      )}
        </div>
      </div>
        )
}
export default CreateEvents;