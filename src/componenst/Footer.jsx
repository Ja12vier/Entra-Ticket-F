import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-12 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 pb-12">
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl font-black italic tracking-tighter">
              ENTRA TICKET<span className="text-red-600">APP</span>
            </h2>
            <p className="font-mono text-gray-400 text-sm max-w-md border-l-2 border-red-600 pl-4">
              La plataforma definitiva para la gestión de tickets. 
              Seguridad garantizada en cada transacción y acceso exclusivo a los mejores eventos.
            </p>
          </div>
          
          <div className="flex gap-3">
            {['IG', 'TW', 'FB', 'YT'].map((red) => (
              <div key={red} className="w-12 h-12 border-2 border-white flex items-center justify-center font-bold hover:bg-green-500 hover:border-green-500 hover:text-black transition-all duration-300 cursor-pointer text-sm">
                {red}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 border-l border-zinc-800 md:pl-16 font-mono">
          <div className="flex flex-col gap-3">
            <span className="text-red-600 font-bold text-xs mb-2 tracking-widest">// NAVEGACIÓN</span>
            <a href="#" className="text-lg transition-all">EVENTOS</a>
            <a href="#" className="text-lg transition-all">REVENTA</a>{/*No quise poner el link real igual en la navegacion de abajo*/}
            <a href="#" className="text-lg  transition-all">MERCADO</a>
            <a href="#" className="text-lg  transition-all">MI CUENTA</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-red-600 font-bold text-xs mb-2 tracking-widest">// LEGAL</span>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">SOPORTE</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">TÉRMINOS</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">PRIVACIDAD</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>
      </div>
      <div className="bg-white text-black py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] font-bold uppercase tracking-[0.25em]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p>© 2026 Hecho por JAVICORP.DEV - REPUBLICA DOMINICANA</p>
          </div>
          <p className="mt-2 md:mt-0 bg-black text-white px-2 py-1">
            Todos los derechos reservado
          </p>
          <p className="mt-2 md:mt-0">Entra ticket v1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;