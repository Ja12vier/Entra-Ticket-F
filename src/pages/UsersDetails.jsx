import { Button, Card, Checkbox, Label,Select ,TextInput } from "flowbite-react";
import logi from '../assets/login.png';
import axios from "axios";
import { Alert } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Config from "../utils/Config";

const UsersDetails=()=>{
  const navigate= useNavigate();
  const {id}=useParams();
  const [showAlert, setShowAlert]=useState(false);
  const [showAlert2, setShowAlert2]=useState(false);
  //const [data, setData]= useState({});

  const handleSubmit =(e)=>{
    e.preventDefault();
    const data={};
    if(e.target.name.value) data.name=e.target.name.value;
    if(e.target.last_name.value) data.last_name=e.target.last_name.value;
    if(e.target.identity_document.value) data.identity_document=e.target.identity_document.value;
    if(e.target.addres.value) data.addres=e.target.addres.value;
    if(e.target.phone.value) data.phone=e.target.phone.value;
    if(e.target.role.value) data.role=e.target.role.value;

     axios 
     .patch(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/users/${id}`, data, Config())
     .then(()=>{
      setShowAlert(true);
      setTimeout(() => {
       navigate("/users");
      }, 1000);
     })
     .catch((error)=>{
      console.log(error);
      setShowAlert2(true);
    });
  }
   
    return(
    <div>
        <div className="flex justify-center items-center">
            <Card className=" my-20  w-140 shadow-2xl">
            <img src={logi} alt="Login" className="w-20 h-20 mx-auto mb-2" />
            <h2 className="text-center text-2xl">Editar Usuarios</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-10">
            <div className="flex justify-between gap-2">
                <div>
                <div className="mb-2 w-64 block">
                    <Label htmlFor="name">Nombre</Label>
                </div>
                <TextInput id="name" type="text" placeholder="Nombre"  />
                </div>
                <div>
                <div className="mb-2 block w-64">
                    <Label htmlFor="last_name">Apellido</Label>
                </div>
                <TextInput id="last_name" type="text" placeholder="Apellido"  />
                </div>
            </div>
            <div className="flex justify-between gap-2">
                <div>
                <div className="mb-2 w-64 block">
                    <Label htmlFor="identity_document">Documento de identidad</Label>
                </div>
                <TextInput id="identity_document" type="text" placeholder="Documento de identidad" max={13} min={11}  />
                </div>
                <div>
                <div className="mb-2 w-64 block">
                    <Label htmlFor="phone">Telefono</Label>
                </div>
                <TextInput id="phone" type="text" placeholder="809-484-1713"  />
                </div>
            </div>
              <div className="flex justify-between gap-2">
                <div>
                <div className="mb-2 w-64 block">
                    <Label htmlFor="role">Role</Label>
                </div>
                <Select id="role" required>
                    <option>admin</option>
                    <option>user</option>
                </Select>
                </div>
             
                </div>
                <div>
                <div className="mb-2 w-64 block">
                    <Label htmlFor="addres">Direccion</Label>
                </div>
                <TextInput id="addres" type="text" placeholder="Direccion"  />
                </div>
            <Button type="submit" className="hover:shadow-2xl  cursor-pointer bg-red-600 text-white hover:bg-red-800">Guardar Cambio</Button>
            </form>
            {showAlert && (
            <Alert color="info" onDismiss={() => setShowAlert(false)}>
                <span className="font-medium">¡cambios guardados!</span>Se guardaron los cambios exitosamente.
            </Alert>
            )}
            {showAlert2 && (
            <Alert color="failure" onDismiss={() => setShowAlert2(false)}>
                <span className="font-medium">¡Error!</span>No se guardaron los cambios.
            </Alert>
            )}
      </Card>   
     </div>
    </div>
    )
}   
export default UsersDetails;