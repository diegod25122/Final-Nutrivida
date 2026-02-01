import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import "../CSS/Style.css";
import "../CSS/clases.css";

function Classes() {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [comentario, setComentario] = useState("");
  const [resultadoComentario, setResultadoComentario] = useState("");

  const clases = [
    {
      nombre: "Yoga",
      img: "/images/Yoga.png",
      desc: "Fortalece cuerpo y mente con técnicas de respiración y equilibrio interior.",
    },
    {
      nombre: "Boxeo",
      img: "/images/guantes.png",
      desc: "Mejora tu resistencia, coordinación y libera el estrés mientras entrenas.",
    },
    {
      nombre: "Pilates",
      img: "/images/pilates.jpg",
      desc: "Fortalece tu centro corporal y mejora tu postura con movimientos controlados.",
    },
    {
      nombre: "Aumento de Masa Muscular",
      img: "/images/masaMuscular.jpg",
      desc: "Rutinas específicas y alimentación para lograr tu máximo rendimiento físico.",
    },
    {
      nombre: "Rehabilitación",
      img: "/images/Rehabilitacion.jpg",
      desc: "Recupera movilidad y bienestar con ejercicios guiados por profesionales.",
    },
    {
      nombre: "Culturismo",
      img: "/images/culturismo.jpg",
      desc: "Entrenamiento avanzado para desarrollo muscular y estética física.",
    },
  ];

  // ===============================
  // REGISTRAR CLASE (FIRESTORE)
  // ===============================
  const registrarClase = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión para registrar una clase");
      window.location.href = "/login";
      return;
    }

    try {
      const ref = collection(db, "usuarios", user.uid, "clases");

      // ❌ evitar duplicados
      const q = query(ref, where("nombre", "==", claseSeleccionada.nombre));
      const snap = await getDocs(q);

      if (!snap.empty) {
        alert("Ya estás registrado en esta clase");
        return;
      }

      // ✅ guardar clase
      await addDoc(ref, {
        nombre: claseSeleccionada.nombre,
        imagen: claseSeleccionada.img,
        creadoEn: new Date()
      });

      alert(`Te registraste en ${claseSeleccionada.nombre} 💪🔥`);
      setClaseSeleccionada(null);

    } catch (error) {
      alert("Error al registrar clase");
      console.error(error);
    }
  };

  // ===============================
  // COMENTARIOS (LOCAL POR AHORA)
  // ===============================
  const enviarComentario = (e) => {
    e.preventDefault();
    setResultadoComentario("✔ ¡Comentario enviado! Gracias por tu opinión.");
    setComentario("");
  };

  return (
    <>
      {/* CLASES */}
      <section className="classes-section">
        <h1>PROGRAMAS DISPONIBLES</h1>
        <p className="subtitle">
          Descubre nuestras clases y encuentra la que se adapta mejor a tu estilo de vida
        </p>

        <div className="class-container">
          {clases.map((c) => (
            <div
              key={c.nombre}
              className="class-card dynamic-card"
              onClick={() => setClaseSeleccionada(c)}
            >
              <img src={c.img} alt={c.nombre} />
              <h3>{c.nombre}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDARIO */}
      <section className="calendar-section fade-in">
        <h2>Calendario Semanal</h2>
        <table className="calendar-table calendar-animate">
          <thead>
            <tr>
              <th>Día</th>
              <th>Clase</th>
              <th>Hora</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Lunes</td><td>Yoga</td><td>08:00 - 09:00</td><td>María López</td></tr>
            <tr><td>Martes</td><td>Boxeo</td><td>10:00 - 11:00</td><td>Juan Pérez</td></tr>
            <tr><td>Miércoles</td><td>Pilates</td><td>15:00 - 16:00</td><td>Camila Torres</td></tr>
            <tr><td>Jueves</td><td>Rehabilitación</td><td>09:00 - 10:00</td><td>Roberto Sánchez</td></tr>
            <tr><td>Viernes</td><td>Culturismo</td><td>18:00 - 19:00</td><td>Carlos Rivera</td></tr>
          </tbody>
        </table>
      </section>

      {/* AMIGOS */}
      <section className="friends-section neon-box">
        <h2 className="neon-title">👥 Conecta con tus amigos</h2>
        <div className="friends-container">
          {["@JuanFit", "@LauraHealthy", "@CarlosGym"].map((u) => (
            <div key={u} className="friend-card">
              <img src="/images/perfil.jpg" alt={u} />
              <p>{u}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMENTARIOS */}
      <section className="comments-section">
        <h2>Deja tu comentario</h2>
        <form onSubmit={enviarComentario} className="comment-form">
          <textarea
            required
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe tu opinión..."
          />
          <button type="submit">Enviar</button>
        </form>
        {resultadoComentario && <p className="fade-in">{resultadoComentario}</p>}
      </section>

      {/* MODAL */}
      {claseSeleccionada && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{claseSeleccionada.nombre}</h5>
                <button className="btn-close" onClick={() => setClaseSeleccionada(null)} />
              </div>
              <div className="modal-body text-center">
                <img src={claseSeleccionada.img} className="img-fluid rounded mb-3" />
                <p>{claseSeleccionada.desc}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={registrarClase}>
                  Registrarme 💪
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Classes;
