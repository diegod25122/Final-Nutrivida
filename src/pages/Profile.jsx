import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import "../CSS/Style.css";
import "../CSS/perfil.css";

function Profile() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState(null);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // 🔐 PROTEGER RUTA CON FIREBASE
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      // 📄 traer datos desde Firestore
      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        navigate("/login");
        return;
      }

      const userData = snap.data();
      setDatos(userData);

      // 💾 guardar cache (navbar, home, etc.)
      localStorage.setItem("logueado", "true");
      localStorage.setItem("usuarioNV", JSON.stringify(userData));
      localStorage.setItem("nombreUsuario", userData.nombres);
      localStorage.setItem(
        "fotoUsuario",
        userData.foto || "/images/defaultProfile.png"
      );

      // 📚 clases por EMAIL (ya no por usuario)
      const key = `clases_${userData.email}`;
      const guardadas = JSON.parse(localStorage.getItem(key)) || [];
      setClases(guardadas);
    });

    return () => unsub();
  }, [navigate]);

  const cerrarSesion = async () => {
    await signOut(auth);

    localStorage.removeItem("logueado");
    localStorage.removeItem("usuarioNV");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("fotoUsuario");

    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  if (!datos) return null;

  return (
    <div className="profile-body">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            NUTRI<span className="text-success">•VIDA</span>
          </Link>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/classes">Clases</Link>
            </li>

            <li className="nav-item ms-3">
              <img
                src={datos.foto || "/images/defaultProfile.png"}
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENIDO */}
      <section className="container my-5 pt-5">
        <div className="row justify-content-center align-items-start g-5">

          {/* PERFIL */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <div className="profile-card">
              <img
                src={datos.foto || "/images/defaultProfile.png"}
                className="profile-img"
              />

              <h2>{datos.nombres} {datos.apellidos}</h2>
              <p className="perfil-user">{datos.email}</p>

              <hr />

              <div className="profile-info">
                <p><strong>Nombres:</strong> {datos.nombres}</p>
                <p><strong>Apellidos:</strong> {datos.apellidos}</p>
                <p><strong>Email:</strong> {datos.email}</p>
                <p><strong>Objetivo:</strong> {datos.objetivo}</p>
              </div>

              <button className="btn-logout" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* CLASES */}
          <div className="col-12 col-lg-7">
            <h3 className="text-white mb-4 text-center">
              📚 Mis Clases Registradas
            </h3>

            <div className="row g-4 justify-content-center">
              {clases.length === 0 ? (
                <p className="text-center text-white">
                  No estás registrado en ninguna clase aún 😴
                </p>
              ) : (
                clases.map((clase, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card bg-dark text-white">
                      <img
                        src={clase.imagen || "/images/yoga.png"}
                        className="card-img-top"
                      />
                      <div className="card-body text-center">
                        <h5>{clase.nombre}</h5>
                        <p>Clase registrada 💪</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Profile;
