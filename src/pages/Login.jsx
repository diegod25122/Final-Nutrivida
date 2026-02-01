import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import "../CSS/Style.css";
import "../CSS/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  //  ADMIN QUEMADO
  
  if (email === "admin@nutrivida.com" && password === "nutrivid@2026") {
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", "admin");

    // limpiar posibles datos viejos
    localStorage.removeItem("usuarioNV");
    localStorage.removeItem("userId");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("fotoUsuario");

    window.dispatchEvent(new Event("authChange"));
    navigate("/admin");
    return;
  }

  // =========================
  // 👤 USUARIO NORMAL (Firebase)
  // =========================
  try {
    // 🔐 Login con Firebase Auth
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // 📄 Obtener datos del usuario desde Firestore
    const ref = doc(db, "usuarios", cred.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Perfil no encontrado");
      return;
    }

    const datos = snap.data();

    // 💾 Guardar sesión (como ya lo tenías)
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", "user");
    localStorage.setItem("usuarioNV", JSON.stringify(datos));
    localStorage.setItem("userId", cred.user.uid);
    localStorage.setItem("nombreUsuario", datos.nombres || "");
    localStorage.setItem(
      "fotoUsuario",
      datos.foto || "/images/defaultProfile.png"
    );

    // 🔔 avisar al Navbar
    window.dispatchEvent(new Event("authChange"));

    // 👉 ir al dashboard normal
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Correo o contraseña incorrectos ❌");
  }
};


  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="login-container">

          <div className="login-left">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para continuar.</p>
            <img
              src="/images/saludable.jpg"
              className="login-image"
              alt="Saludable"
            />
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
