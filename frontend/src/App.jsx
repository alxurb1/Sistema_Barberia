import React from 'react'
import NavBar from "./components/NavBar";
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HaircutsPage from "./pages/HaircutsPage"
import ReservationsPage from "./pages/ReservationsPage"


function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-200">
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/haircuts/:id" element={<HaircutsPage/>}/>
        <Route path="/reservations/:id" element={<ReservationsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

