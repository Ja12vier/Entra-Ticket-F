import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThumbsEvents } from "../store/slices/events.slice";
import axios from "axios";
import { setIsloader } from "../store/slices/isLoader.slice";

const Carousel = () => {
 const [currentSlide, setCurrentSlide] = useState(0);
 const dispatch=useDispatch();
 const [events, setEvents] = useState([]);
 const eventsTris=events.slice(0,3);

  const slides =[
    {  img:eventsTris[0]?.imageUrl, bg: "bg-gradient-to-t from-black via-red-500 to-orange-600" },
    {  img:eventsTris[1]?.imageUrl, bg: "bg-gradient-to-b from-yellow-400 via-black to-gray-800 " },
    {  img:eventsTris[2]?.imageUrl, bg: "bg-gradient-to-tr from-black via-red-600 to-orange-400" },
  ]

  useEffect(() => {
   dispatch(setIsloader(true));
   
   axios
   .get(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/events/areas`)
   .then((resp) =>setEvents(resp.data))
   .catch((error) => console.log(error))
   .finally(() =>dispatch(setIsloader(false)))
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  

  
  return (
    <div className="relative mx-auto h-[500px] w-full overflow-hidden ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
            slide.bg
          } ${index === currentSlide ? "translate-x-0" : "translate-x-full"}`}
        >
          <img src={slide.img} alt="image"
          className="cover w-[80%] h-full object-cover "
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;