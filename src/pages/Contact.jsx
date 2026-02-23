

const Contact = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 bg-white">
      <div className="max-w-md w-full text-center">
        
        <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">
          Contáctanos
        </h2>
        <p className="text-gray-500 mb-10">
          ¿Tienes dudas con tus boletos? Estamos aquí para ayudarte.
        </p>

        <div className="space-y-4">
          <a 
            href="https://wa.me/tu_numero" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-100 rounded-2xl hover:border-red-600 text-gray-800 hover:bg-black  transition-all duration-300 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            <span className="font-bold">WhatsApp Directo</span>
          </a>


          <a 
            href="mailto:soporte@entraticket.com" 
            className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-100 rounded-2xl hover:border-red-600 hover:text-white hover:bg-black transition-all duration-300 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
            <span className="font-bold">soporte@entraticket.com</span>
          </a>

          <a 
            href="https://instagram.com/tu_cuenta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full p-4 border-2 border-gray-100 rounded-2xl hover:border-red-600 hover:text-white hover:bg-black transition-all duration-300 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
            <span className="font-bold">@entraticket</span>
          </a>
        </div>

        <p className="mt-12 text-xs text-gray-400 uppercase tracking-widest">
          Horario de atención: Lun - Vie / 9am - 6pm
        </p>
      </div>
    </section>
  );
};

export default Contact;