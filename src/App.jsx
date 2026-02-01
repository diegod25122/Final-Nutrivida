import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Access from "./pages/Access";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";

function App() {
  const location = useLocation();

  const ocultarLayout = location.pathname === "/admin";

  return (
    <>
      {/*  NO Navbar en /admin */}
      {!ocultarLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/access" element={<Access />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/*  NO Footer en /admin */}
      {!ocultarLayout && <Footer />}
    </>
  );
}

export default App;
