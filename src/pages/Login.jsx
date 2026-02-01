import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos
import "../CSS/Style.css";
import "../CSS/login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const datos = JSON.parse(localStorage.getItem("usuarioNV"));

    if (!datos) {
      alert("No hay usuarios registrados. Por favor, regístrate primero.");
      return;
    }

    if (email === datos.email && password === datos.password) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("nombreUsuario", datos.nombres);
      localStorage.setItem("fotoUsuario", datos.foto || "/images/defaultProfile.png");

      window.dispatchEvent(new Event("authChange")); 
      navigate("/");
    } else {
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="login-body">
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
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Contraseña</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
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