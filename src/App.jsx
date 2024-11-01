import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TourList from "./pages/TourList.jsx";
import Login from './pages/Login.jsx';
import TourDetails from './pages/TourDetails.jsx';
import Booking from './pages/Booking.jsx';
import AddTour from './pages/AddTour.jsx';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tour-details/:id" element={<TourDetails/>} />
      <Route path="/login-register" element={<Login />} />
      <Route path="/tour-list" element={<TourList />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/add-tour" element={<AddTour />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App