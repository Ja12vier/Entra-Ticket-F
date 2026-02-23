import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaUserEdit } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import TicketTimer from "./TicketTime";
import { useEffect, useState } from "react";
import axios from "axios";
import Config from "../utils/Config";
import bin from "../assets/bin.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsloader } from "../store/slices/isLoader.slice";
import { getCartThunk } from "../store/slices/cart.slice";
import { setShowCart } from "../store/slices/showCart.slice";
import { TbShoppingCartDollar, TbTicketOff } from "react-icons/tb";
import { Alert } from "flowbite-react";

const Navbar = () => {
    const { user } = useAuth();
    const cart = useSelector((state) => state.cart);
    const showCartState = useSelector((state) => state.showCart);
    const dispatch = useDispatch();
    const minuteInitial = 25;
    const ticket = cart.length > 0 ? cart[0]?.ticketSeats : [];
    const initialTime = minuteInitial * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [prevTicketLength, setPrevTicketLength] = useState(ticket.length);
    const [isvisibleCupon, setIsvisibleCupon] = useState(false);
    const [errorCupon, setErrorCupon] = useState(null);
    const [codeCoupons, setCodeCoupons] = useState("");
    const navigate = useNavigate();
    
    // Estado para el menú hamburguesa
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getCartThunk());
        setErrorCupon(null);
    }, []);

    useEffect(() => {
        if (ticket.length > prevTicketLength || ticket.length === 0) {
            setTimeLeft(initialTime);
        }
        setPrevTicketLength(ticket.length);
    }, [ticket.length, initialTime]);

    useEffect(() => {
        if (ticket.length === 0 || timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [ticket.length, timeLeft]);

    const deleteTicket = (id) => {
        dispatch(setIsloader(true));
        axios.delete(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/ticket-seats/${id}`, Config())
            .then(() => dispatch(getCartThunk()))
            .catch((error) => console.log(error))
            .finally(() => {
                setTimeout(() => dispatch(setIsloader(false)), 500);
            });
    }

    const addCupon = (e) => {
        e.preventDefault();
        const data = { codeCoupons: e.target[0].value };
        dispatch(setIsloader(true));
        axios.patch(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/carts/coupons`, data, Config())
            .then(() => {
                dispatch(getCartThunk());
                setErrorCupon(true);
            })
            .catch(() => setErrorCupon(false))
            .finally(() => {
                setTimeout(() => {
                    dispatch(setIsloader(false));
                    setCodeCoupons("");
                }, 1000);
            });
    }
   console.log(user?.rolle);
   
    const buyCart = (total) => {
        const data = { currencyCode: "USD", totalValue: total };
        dispatch(setIsloader(true));
        axios.post(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/paypals/create-order`, data, Config())
            .then((resp) => {
                const aproveUrl = resp.data.responses.links.filter((link) => link.rel === "approve");
                if (aproveUrl) window.location.href = aproveUrl[0].href;
            })
            .catch((error) => {
                console.log(error);
                dispatch(setIsloader(false));
            });
    }

    return (
        <nav className="relative m-4 rounded-2xl shadow-md font-serif shadow-red-600 border-b-2 border-r-2 border-red-600 bg-black text-white py-4 px-6 md:px-20 lg:px-26 transition-all">
            <div className="flex justify-between items-center">
                <Link to={"/"} className="z-20">
                    <div className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none">
                        <p>Entra</p>
                        <p className="text-red-600">Ticket</p>
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:hidden z-20">
                    <button 
                        onClick={() => dispatch(setShowCart(!showCartState))}
                        className="relative p-2 bg-red-600 rounded-lg text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white rounded-full border border-red-600 bg-black">
                            {cart[0]?.quantity || 0}
                        </span>
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            }
                        </svg>
                    </button>
                </div>

                <div className={`
                    fixed inset-0 bg-black/95 flex flex-col justify-center items-center gap-8 text-xl transition-transform duration-300 z-10
                    md:static md:flex md:flex-row md:bg-transparent md:gap-8 lg:gap-16 md:text-lg md:inset-auto md:translate-x-0
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}>
                    <Link onClick={() => setIsMenuOpen(false)} to={"/contacts"} className="hover:text-red-600">Contacto</Link>
                    <Link onClick={() => setIsMenuOpen(false)} className="hover:text-red-600" to={"/create-events"}>Crear Evento</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to={"/login"} className="hover:text-red-600">Login</Link>
                    
                    {user?.role === "admin" && (
                        <Dropdown label="administrador" arrowIcon={false} inline={true} className="bg-black font-bold border-2 border-red-600">
                            <DropdownItem className="text-gray-400 hover:text-red-600 hover:bg-gray-900" icon={FaUserEdit} as={Link} to={"/users"}>Usuarios</DropdownItem>
                            <DropdownItem className="text-gray-400 hover:text-red-600 hover:bg-gray-900" icon={TbTicketOff} as={Link} to={"/validate-ticket"}>Verificar Ticket</DropdownItem>
                        </Dropdown>
                    )}

                    <button 
                        onClick={() => dispatch(setShowCart(!showCartState))}
                        className="hidden md:block relative cursor-pointer bg-red-600 text-white p-2.5 rounded-xl hover:text-black hover:bg-red-700 shadow-lg hover:scale-105 border-2 border-red-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full border-2 border-red-600 bg-black shadow-lg">
                            {cart[0]?.quantity || 0}
                        </span>
                    </button>
                </div>
            </div>

            {showCartState && (
                <div className="absolute w-[92vw] md:w-90 shadow-2xl shadow-black z-30 bg-white max-w-[500px] right-2 md:right-16 top-24 rounded-2xl p-4 text-black">
                    <div className="mb-4">
                        {ticket.length > 0 && <TicketTimer timeLeft={timeLeft} />}
                    </div>
                    <hr />
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {ticket.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-800 font-mono font-bold text-lg">Tu carrito está vacío</h3>
                            </div>
                        ) : ticket.map((t) => (
                            <div key={t.id} className="font-mono mt-4">
                                <p className="font-semibold text-lg text-gray-700 px-2">{t.nameEvent}</p>
                                <div className="flex items-center px-2 justify-between gap-3 font-bold mb-4">
                                    <img className="w-12 h-12 rounded-xl object-cover" src={t.imageUrl} alt="event" />
                                    <p className="text-sm">{t.type}</p>
                                    <p className="text-sm">RD$ {t.price}</p>
                                    <button onClick={() => deleteTicket(t.id)} className="cursor-pointer">
                                        <img className="w-6" src={bin} alt="eliminar" />
                                    </button>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>

                    <div className="font-mono px-2 font-semibold mt-4 text-sm">
                        <div className="flex justify-between text-gray-600"><span>Sub Total</span><span>RD$ {cart[0]?.subTotal || 0}</span></div>
                        <div className="flex justify-between text-gray-600"><span>Descuento</span><span>RD$ {cart[0]?.discount || 0}</span></div>
                        <div className="flex justify-between text-black text-lg border-t pt-2"><span>Total</span><span>RD$ {cart[0]?.total || 0}</span></div>
                    </div>

                    <div className="w-full flex justify-center mt-4">
                        <button 
                            onClick={() => buyCart(cart[0].total)} 
                            disabled={ticket.length === 0} 
                            className={`border w-full py-3 rounded-lg bg-lime-500 hover:bg-lime-600 text-white font-bold font-mono text-lg transition-all ${ticket.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Proceder al Pago
                        </button>
                    </div>
                    
                    <div className="flex justify-end mt-3 text-red-600 font-semibold font-mono">
                        <button onClick={() => setIsvisibleCupon(!isvisibleCupon)} className="flex items-center gap-2 hover:text-red-800">
                            <TbShoppingCartDollar /> ¿Tienes un cupón?
                        </button>
                    </div>
                    {isvisibleCupon && (
                        <form onSubmit={addCupon} className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={codeCoupons} 
                                    onChange={(e) => setCodeCoupons(e.target.value)} 
                                    placeholder="TICKET20" 
                                    className="flex-1 px-3 py-2 border rounded-xl text-sm"
                                />
                                <button type="submit" disabled={!codeCoupons} className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold">Aplicar</button>
                            </div>
                        </form>
                    )}
                    {errorCupon === true && <Alert color="success" className="mt-2 text-xs">Cupón aplicado con éxito.</Alert>}
                    {errorCupon === false && <Alert color="failure" className="mt-2 text-xs">Cupón incorrecto.</Alert>}
                </div>
            )}
        </nav>
    );
}

export default Navbar;