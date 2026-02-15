import { Label, TextInput, Select, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneEventThunk } from "../store/slices/events.slice";
import axios from "axios";
import Config from "../utils/Config";
import { Alert } from "flowbite-react";

const Discounts = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const event=useSelector(state=>state.events);
  const [name, setName]=useState("");
  const [quantityDiscount, setQuantityDiscount]=useState(0);
  const [alertDiscount, setAlertDiscount]=useState(false);
  const [alertError, setAlertError]=useState(false);


  useEffect(()=>{
    dispatch(getOneEventThunk(id));
    setName(event[0]?.name_event)
  },[id])

    useEffect(()=>{
      if (event.length > 0) {
    setName(event[0].name_event);
  }
  },[event])

  const handleDicountSubmit=(e)=>{
    e.preventDefault();
    const value= e.target;
    const data={
      code: value.code.value,
      discountType: value.discountType.value,
      discountValue:Number(value.discountValue.value),
      dateExpiretion: value.dateExpiretion.value,
      maxUsed:Number(value.maxUsed.value),
      eventId:Number(id)

    }
    axios
    .post(`http://localhost:3000/api/v1/discount-coupons`, data, Config())
    .then((resp)=>{
      console.log(resp.data),
      setQuantityDiscount(data.maxUsed),
      setAlertDiscount(true)
      setAlertError(false)
    })
    .catch((err)=>{
      console.log(err),
       setAlertError(true)
       setAlertDiscount(false)
      });


  }
  
  const image=event[0]?.imageUrl || "";

  return (
    <div style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center'}} 
    className={`flex justify-center items-center min-h-screen  flex-col p-4 md:p-8`}>
      <div className="py-4 px-6 bg-white border border-gray-300 rounded-2xl text-center"> 
        <h1 className="font-bold text-black text-3xl">Configura un cupón de descuento para este evento.</h1>
        <h2 className="text-gray-500 text-xl ">Define el tipo de descuento, su valor y la fecha de expiración.</h2>
      </div>
      <div className="w-full max-w-md  bg-white border border-gray-300 my-5 rounded-lg shadow-md p-6">
        
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Crear Descuento
        </h2>

        <form onSubmit={handleDicountSubmit} className="flex flex-col gap-4 ">
          <div>
            <Label htmlFor="code" value="Código de descuento">Código</Label>
            <TextInput
              id="code"
              type="text"
              placeholder="nombre124"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="discountType" value="Tipo de descuento">Tipo de descuento</Label>
            <Select id="discountType" className="mt-1">
              <option value="percentage">Porcentaje (%)</option>
              <option value="fixed">Monto fijo</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="discountValue" value="Valor del descuento">Valor del descuento</Label> 
            <TextInput
              id="discountValue"
              type="number"
              placeholder="6"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dateExpiretion" value="Fecha de expiración">Fecha de expiración</Label>
            <TextInput
              id="dateExpiretion"
              type="date"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maxUsed" value="Máximo de usos">Cantidad de cupons</Label>
            <TextInput
              id="maxUsed"
              type="number"
              placeholder="2"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="eventName" value="Nombre del evento">Nombre del evento</Label>
            <TextInput
              id="eventName"
              type="text"
              placeholder={name}
              value={name}
              onChange={e=>setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          {
            alertDiscount && (
               <Alert color="info">
                <span className="font-medium">SUCCESS!</span> Se crearon <span className="font-bold text-2xl">{quantityDiscount}</span> cupones, listo para ser usado.
              </Alert>
            )
          }
          {
            alertError && (
               <Alert color="failure">
                <span className="font-medium">ERROR!</span> Hubo un error al crear los cupones.
              </Alert>
            )
          }
       
          <Button
            type="submit"
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Guardar Descuento
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Discounts;