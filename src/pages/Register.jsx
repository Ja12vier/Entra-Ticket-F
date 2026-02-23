
import { Button, Card, Checkbox, Label,Select ,TextInput } from "flowbite-react";
import logi from '../assets/login.png';
import axios from "axios";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate= useNavigate();
  const [showAlert, setShowAlert]=useState(false);
  const handleSubmit =(e)=>{
    e.preventDefault();  
    const data = {
      name:e.target.name.value,
      last_name:e.target.last_name.value,
      email:e.target.email.value,
      password:e.target.password.value,
      identity_document:e.target.identity_document.value,
      addres:e.target.addres.value,
      phone:e.target.phone.value,
      gender:e.target.gender.value,
      date_birth:e.target.date_birth.value,
    }; 
    
     axios 
     .post("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/users",data)
     .then(()=>{
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login");
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
        <div className="flex justify-center items-center">
            <Card className=" my-20 w-80  sm:w-140  shadow-2xl">
            <img src={logi} alt="Login" className="w-20 h-20 mx-auto mb-2" />
            <h2 className="text-center text-2xl">Registrate</h2>
          <form onSubmit={handleSubmit} className="flex flex-col  gap-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="name">Nombre</Label>
                </div>
                <TextInput id="name" type="text" placeholder="Nombre" required />
              </div>
                <div>
                <div className="mb-2 block w-64">
                  <Label htmlFor="last_name">Apellido</Label>
                </div>
                <TextInput id="last_name" type="text" placeholder="Apellido" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="email">Correo</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@email.com" required />
              </div>
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <TextInput id="password" type="password" placeholder="*********" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="identity_document">Documento de identidad</Label>
                </div>
                <TextInput id="identity_document" type="text" placeholder="Documento de identidad" max={13} min={11} required />
              </div>
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="phone">Telefono</Label>
                </div>
                <TextInput id="phone" type="text" placeholder="809-484-1713" required />
              </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="gender">Género</Label>
                </div>
                <Select id="gender" required>
                    <option>masculino</option>
                    <option>femenino</option>
                    <option>no binario</option>
                </Select>
              </div>
               <div>
                  <div className="mb-2 w-64 block">
                    <Label htmlFor="date_birth">Fecha de nacimiento</Label>
                  </div>
                  <TextInput id="date_birth" type="date" placeholder="1996-08-26" required />
               </div>
              </div>
              <div>
                <div className="mb-2 w-64 block">
                  <Label htmlFor="addres">Direccion</Label>
                </div>
                <TextInput id="addres" type="text" placeholder="Direccion" required />
              </div>
            <Button type="submit" className="hover:shadow-2xl  cursor-pointer bg-red-600 text-white hover:bg-red-800">Crear cuenta</Button>
          </form>
        {showAlert && (
        <Alert color="info" onDismiss={() => setShowAlert(false)}>
          <span className="font-medium">¡Registro exitoso!</span>El usuario se ha registrado con exito.
        </Alert>
      )}
        </Card>
            
        </div>
        )
}
export default Register;