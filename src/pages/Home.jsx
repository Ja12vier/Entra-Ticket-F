
import { useDispatch, useSelector } from 'react-redux';
import {Carousel}from '../componenst/index';
import { Card } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getThumbsEvents } from '../store/slices/events.slice';
import { Link } from 'react-router-dom';
import { setIsloader } from '../store/slices/isLoader.slice';

const Home=()=> {
   
  const dispatch=useDispatch();
  const events=useSelector(state=>state.events);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(events);

  useEffect(() => {
    dispatch(getThumbsEvents(searchTerm));
  }, [searchTerm]);

  return (
    <div className="">
      <Carousel />
      <div className='my-12 flex justify-center items-center flex-col '>
        
      <div className='border-2 rounded-2xl py-4 md:py-6 w-full max-w-5xl h-auto md:h-24 flex justify-center items-center border-white shadow-sm shadow-black bg-white/5 mx-auto'>
        <form className="flex items-center justify-center relative w-full max-w-3xl px-4">
          <input
            type="text" 
            placeholder="Buscar un Evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-28 py-2.5 text-black rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 border border-white/20 w-full h-12"
          />
          <button 
            type="button"
            onClick={() => setSearchTerm("")} 
            className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg cursor-pointer bg-gradient-to-r from-red-400 to-red-500 text-sky-900 hover:text-white hover:from-amber-500 hover:to-red-600 transition-all duration-300 shadow-lg text-xs md:text-sm font-bold"
          >
            Reiniciar
          </button>
        </form>
      </div>
       <div className='w-290 mt-8'>
      {
        events.length>0?
        <h2 className='font-semibold  text-center mb-4 font-serif my-2 text-2xl md:text-3xl'>Los Nuevos en Cartelera</h2>:
        <h2 className='font-semibold mb-4 font-serif text-center text-3xl text-red-600'>No hay eventos</h2>
      }
          <div className='card grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center p-4'>        
              {
                events.map((event)=>(
                 <Link  to={`/events/${event.id}`} key={event.id} >
                  <Card
                    className="w-66  h-120 shadow-lg hover:shadow-2xl hover:bg-gray-100 [&>div]:p-2"
                    renderImage={()=>
                    <div className="aspect-4/4 h-80  ">
                      <img 
                        className="w-full h-full  rounded-t-lg"
                        src={event?.imageUrl} 
                        alt="imagen" 
                      />
                    </div>}
                  >
                    <div >
                      <p className="font-serif mt-0 text-gray-900 text-sm dark:text-gray-400">
                          Fecha: {event?.date_event}  Hora: {event?.hour_event}
                      </p>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {event?.name_event}
                      </h5>
                      <p className="font-normal mt-0 text-gray-700 dark:text-gray-400">
                        {event?.place}
                      </p>
                    </div>
                   
                  </Card>
                  </Link>
                ))
              }
          </div>

       </div>

      </div>
      
    </div>
  );
}

export default Home;