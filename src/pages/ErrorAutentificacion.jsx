import { Alert } from "flowbite-react";



const ErrorAutentificacion = () => {
    return (
        <div className="flex justify-center h-screen bg-gray-300">
            <div className=" bg-red-600 w-150 h-70 mt-24 rounded-2xl flex flex-col justify-center gap-4 p-5">
                <h2 className="text-center font-semibold font-sans text-5xl">Error de autenticación</h2>
                <Alert color="warning" >
                <span className="font-medium ">Alerta!</span>  Hubo un problema durante el proceso de autenticación. Intente acceder nuevamente.
                </Alert>
            </div>

        </div>
    )
}


export default ErrorAutentificacion;