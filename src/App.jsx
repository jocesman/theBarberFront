import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthForm from './components/Authform/AuthForm';
import RegForm from './components/RegForm/RegForm';
import ErrorPage from './components/ErrorPage';
import RecuperarPass from './components/RecuperarPass/RecuperarPass';
import Home from './views/Home';
import Appointments from './views/Appointments';
import Services from './views/Servicios';
import Contacto from './components/Contacto';
import UserProvider from './contexts/UserProvider';


function App() {

    const location = useLocation();
    const hideNavBarRoutes = ['/login', '/CrearCuenta', '/RecuperarContrasena'];
    const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

    return (
      <UserProvider>
      <div className='App'>
        {shouldShowNavBar && <NavBar />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path='/CrearCuenta' element={<RegForm />} />
          <Route path='/RecuperarContrasena' element={<RecuperarPass />} />
          <Route path='/QuienesSomos' element={<Home />} />
          <Route path='/turnos' element={<Appointments />} />
          <Route path='/servicios' element={<Services />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='*' element={<ErrorPage />} />  
        </Routes>
      </ div>
    </UserProvider>
  )
}

export default App;

