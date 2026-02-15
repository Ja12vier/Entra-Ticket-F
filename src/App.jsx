
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {IsLoaders, Navbar} from './componenst/index';
import {Home, EventDetails, Login, Register, ErrorAutentificacion, Users, UsersDetails, CreateEvents, SectionAreas, PurchasedTicket, DiscountsAll, ValidaTicket, TicketRebend, ChekoutSuccess} from "./pages/index";
import { useSelector } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import RoleGuard from './utils/RoleGuard';
import ProtecteRoute from './utils/protecteRoute';
import Discounts from './pages/Discounts';
import Footer from './componenst/Footer';




function App() {
  const isloader=useSelector(state=>state.isLoader);

  return (
  <AuthProvider>
    <HashRouter>
      <Navbar />
      {isloader && <IsLoaders />}
      <Routes>
        
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/events/:id" element={<EventDetails />}/>
          <Route path="/error-autentificacion" element={<ErrorAutentificacion />}/>
          <Route path='/ticket-rebend-event/:id' element={<TicketRebend />} />
          <Route path="/checkout-success" element={<ChekoutSuccess />} />

          <Route element={<ProtecteRoute />} >
            <Route path="/create-events" element={<CreateEvents />}/>
            <Route path="/section-areas/:id" element={<SectionAreas />}/>
            <Route path="/purchased-ticket" element={<PurchasedTicket />}/>
            <Route path="/discounts/event/:id" element={<Discounts />}/>
            <Route path="/discounts-all/:id" element={<DiscountsAll />}/>
          </Route>

          <Route element={<RoleGuard allowedRoles={["user", "admin"]}/>} >
            <Route path="/users" element={<Users />}/>
            <Route path="/users/:id" element={<UsersDetails />}/>
            <Route path='/validate-ticket' element={<ValidaTicket />} />

          </Route>

        
      </Routes>
     <Footer/>
    </HashRouter>
  </AuthProvider>
  )
}

export default App
