import React,{ useEffect} from 'react'
import NavBar from "./components/NavBar";
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HaircutsPage from "./pages/HaircutsPage"
import ReservationsPage from "./pages/ReservationsPage"
import ClientsPage from "./pages/ClientsPage"
import {useThemeStore} from "./store/useThemeStore"



function App() {
  const { theme } = useThemeStore();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme = {theme} >
    <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/haircuts/:id_corte" element={<HaircutsPage/>}/>
        <Route path="/reservations/:id_cita" element={<ReservationsPage/>}/>
        <Route path="/clients/:id_cliente" element={<ClientsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

