import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Access from "./pages/Access";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin";
import Dashboard from "./pages/Dashboard";
import Recetas from "./pages/Recetas";

function App() {
  const location = useLocation();

  // 👉 detectar si estamos en admin
  const esAdmin = location.pathname === "/admin";

  return (
    <>
      {/*  NO navbar en admin */}
      {!esAdmin && <Navbar />}

      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/access" element={<Access />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recetas" element={<Recetas />} />
      </Routes>

      {/*  NO footer en admin */}
      {!esAdmin && <Footer />}
    </>
  );
}

export default App;
