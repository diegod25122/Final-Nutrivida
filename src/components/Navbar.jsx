import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../CSS/Style.css";

function Navbar() {
  const navigate = useNavigate();

  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLogueado(true);

        // 🔥 cargar datos desde Firestore
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        }
      } else {
        setLogueado(false);
        setUsuario(null);
      }
    });

    return () => unsub();
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          NUTRI<span className="text-success">•VIDA</span>
        </Link>

        <div className="collapse navbar-collapse">
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

            {!logueado && (
              <li className="nav-item ms-2">
                <Link className="btn btn-success" to="/register">
                  Registro
                </Link>
              </li>
            )}

            {logueado && usuario && (
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={usuario.foto || "/images/defaultProfile.png"}
                    alt="perfil"
                    className="rounded-circle me-2"
                    style={{ width: "35px", height: "35px", objectFit: "cover" }}
                  />
                  {usuario.nombres}
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Mi Perfil
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={cerrarSesion}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
