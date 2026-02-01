import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Style.css";
import "../CSS/login.css";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const datos = JSON.parse(localStorage.getItem("usuarioNV"));

    if (!datos) {
      alert("No hay usuarios registrados");
      return;
    }

    if (usuario === datos.usuario && password === datos.password) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("nombreUsuario", datos.usuario);
      localStorage.setItem("fotoUsuario", datos.foto || "/images/defaultProfile.png");

      window.dispatchEvent(new Event("authChange")); // 🔥 CLAVE

      navigate("/");
    }
    else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-body">
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

      {/* LOGIN */}
      <div className="login-wrapper">
        <div className="login-container">

          <div className="login-left">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para continuar.</p>
            <img src="/images/saludable.jpg" className="login-image" />
          </div>

          <div className="login-right">
            <h3>Inicia Sesión</h3>

            <form onSubmit={handleLogin} className="login-form">
              <label>Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />

              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="btn-login">
                Ingresar
              </button>
            </form>

            <p className="login-text">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
