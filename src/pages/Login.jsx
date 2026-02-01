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

    // OJO: En tu Register guardamos 'nombre', pero aquí buscas 'usuario'
    // Asegúrate de que los nombres de los campos coincidan
    if (usuario === datos.nombre && password === datos.password) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("nombreUsuario", datos.nombre);
      localStorage.setItem("fotoUsuario", datos.fotoPerfil || "/images/defaultProfile.png");

      window.dispatchEvent(new Event("authChange")); 
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-body">
      {/* 💡 HE QUITADO LA NAVBAR DE AQUÍ PORQUE YA ESTÁ EN APP.JSX */}
      
      <div className="login-wrapper">
        <div className="login-container">

          <div className="login-left">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para continuar.</p>
            <img src="/images/saludable.jpg" className="login-image" alt="Saludable" />
          </div>

          <div className="login-right">
            <h3>Inicia Sesión</h3>
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label>Usuario / Email</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-login">
                Ingresar
              </button>
            </form>

            <p className="login-text">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
