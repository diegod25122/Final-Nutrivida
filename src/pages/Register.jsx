import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Style.css";
import "../CSS/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fecha: "",
    correo: "",
    direccion: "",
    usuario: "",
    password: "",
    foto: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, foto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("usuarioNV", JSON.stringify(form));
    alert("Usuario registrado correctamente");

    navigate("/login");
  };

  return (
    <div className="register-body">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            NUTRI<span className="text-success">•VIDA</span>
          </Link>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/classes">Clases</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* REGISTRO */}
      <section className="register-section">
        <div className="register-container">

          {/* IZQUIERDA */}
          <div className="register-left">
            <h1>
              Registro en <span>NutriVida</span>
            </h1>
            <p>Completa tus datos para crear tu cuenta.</p>
            <img src="/images/saludable.jpg" alt="NutriVida" />
          </div>

          {/* DERECHA */}
          <div className="register-right">
            <h2>Crea tu cuenta</h2>

            <form onSubmit={handleSubmit} className="register-grid">

              <div>
                <label>Nombres:</label>
                <input name="nombres" onChange={handleChange} required />
              </div>

              <div>
                <label>Apellidos:</label>
                <input name="apellidos" onChange={handleChange} required />
              </div>

              <div>
                <label>Cédula:</label>
                <input name="cedula" onChange={handleChange} required />
              </div>

              <div>
                <label>Fecha de nacimiento:</label>
                <input type="date" name="fecha" onChange={handleChange} required />
              </div>

              <div>
                <label>Correo electrónico:</label>
                <input type="email" name="correo" onChange={handleChange} required />
              </div>

              <div>
                <label>Dirección:</label>
                <input name="direccion" onChange={handleChange} required />
              </div>

              <div>
                <label>Usuario:</label>
                <input name="usuario" onChange={handleChange} required />
              </div>

              <div>
                <label>Contraseña:</label>
                <input type="password" name="password" onChange={handleChange} required />
              </div>

              <div className="full">
                <label>Foto de perfil:</label>
                <input type="file" accept="image/*" onChange={handleFoto} />
              </div>

              <button className="btn-register full" type="submit">
                Registrarse
              </button>

            </form>

            <p className="register-text">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login">Iniciar sesión</Link>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Register;
