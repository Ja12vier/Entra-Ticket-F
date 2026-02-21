
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logi from '../assets/login.png';
import axios from "axios";
import { Alert } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate= useNavigate();
    const [showAlert, setShowAlert]= useState(false);
    const { login }=useAuth();

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target[2].value);
        

        const data={
            email:e.target[0].value,
            password:e.target[1].value
        }
        
        axios
        .post("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/users/login",data)
        .then((resp) =>{
            console.log(resp.data);
            login(resp.data.token, resp.data.user);
            setShowAlert(true);
            setTimeout(() => {
             navigate("/"); 
            },2000);
            
        })
        .catch((error) =>{
          console.log(error);
          navigate("/error-autentificacion");
        })
        
    }
    return (
    <div className="flex justify-center items-center">
        <Card className="max-w-lg my-20 w-96 shadow-2xl">
        <img src={logi} alt="Login" className="w-20 h-20 mx-auto mb-2" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-10">
       <div className="flex justify-center items-center flex-col text-gray-500 gap-2">
         <p>bartolomeo02@gmail.com  </p>
        <p>123456</p>
       </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Correo</Label>
          </div>
          <TextInput id="email1" type="email" placeholder="name@email.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Contraseña</Label>
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordar</Label>
        </div>
        <Button type="submit" className="hover:shadow-2xl  cursor-pointer bg-red-600 text-white hover:bg-red-800">Ingresar</Button>
        <Link to={"/register"} className="text-red-600 hover:text-black " >¿No tienes cuenta?</Link>
      </form>
      {showAlert && (
        <Alert color="info" onDismiss={() => setShowAlert(false)}>
          <span className="font-medium">¡Inicio de sesión exitoso!</span>Has iniciado sesión correctamente.
        </Alert>
      )}
    </Card>
        
    </div>
    )
}

export default Login;