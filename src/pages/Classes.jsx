import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Style.css";
import "../CSS/clases.css";

function Classes() {
  const navigate = useNavigate();
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [comentario, setComentario] = useState("");
  const [resultadoComentario, setResultadoComentario] = useState("");

  const clases = [
    {
      nombre: "Yoga",
      img: "/images/Yoga.png",
      horarios: [
        { dia: "Lunes", hora: "08:00 - 09:00", instructor: "María López" },
        { dia: "Miércoles", hora: "18:00 - 19:00", instructor: "Ana García" },
        { dia: "Viernes", hora: "07:00 - 08:00", instructor: "María López" }
      ]
    },
    {
      nombre: "Boxeo",
      img: "/images/guantes.png",
      horarios: [
        { dia: "Martes", hora: "10:00 - 11:00", instructor: "Juan Pérez" },
        { dia: "Jueves", hora: "19:00 - 20:00", instructor: "Carlos Mendoza" },
        { dia: "Sábado", hora: "09:00 - 10:00", instructor: "Juan Pérez" }
      ]
    },
    {
      nombre: "Pilates",
      img: "/images/pilates.jpg",
      horarios: [
        { dia: "Lunes", hora: "15:00 - 16:00", instructor: "Camila Torres" },
        { dia: "Miércoles", hora: "17:00 - 18:00", instructor: "Laura Ruiz" },
        { dia: "Viernes", hora: "16:00 - 17:00", instructor: "Camila Torres" }
      ]
    },
    {
      nombre: "Aumento de Masa Muscular",
      img: "/images/masaMuscular.jpg",
      horarios: [
        { dia: "Lunes", hora: "17:00 - 18:30", instructor: "Carlos Rivera" },
        { dia: "Miércoles", hora: "17:00 - 18:30", instructor: "Roberto Díaz" },
        { dia: "Viernes", hora: "17:00 - 18:30", instructor: "Carlos Rivera" }
      ]
    },
    {
      nombre: "Rehabilitación",
      img: "/images/Rehabilitacion.jpg",
      horarios: [
        { dia: "Martes", hora: "09:00 - 10:00", instructor: "Roberto Sánchez" },
        { dia: "Jueves", hora: "14:00 - 15:00", instructor: "Patricia Vega" },
        { dia: "Sábado", hora: "10:00 - 11:00", instructor: "Roberto Sánchez" }
      ]
    },
    {
      nombre: "Culturismo",
      img: "/images/culturismo.jpg",
      horarios: [
        { dia: "Martes", hora: "18:00 - 19:00", instructor: "Carlos Rivera" },
        { dia: "Jueves", hora: "18:00 - 19:00", instructor: "Miguel Ángel" },
        { dia: "Sábado", hora: "11:00 - 12:00", instructor: "Carlos Rivera" }
      ]
    },
  ];

  const registrarClase = () => {
    if (!horarioSeleccionado) {
      alert("Por favor selecciona un horario");
      return;
    }

    const logueado = localStorage.getItem("logueado");
    if (!logueado) {
      alert("Debes iniciar sesión para registrar una clase");
      navigate("/login");
      return;
    }

    const usuario = localStorage.getItem("nombreUsuario");
    const key = `clases_${usuario}`;
    const guardadas = JSON.parse(localStorage.getItem(key)) || [];

    // Verificar si ya está registrado en esta clase con este horario
    const yaRegistrado = guardadas.some(
      c => c.nombre === claseSeleccionada.nombre && 
           c.dia === horarioSeleccionado.dia && 
           c.hora === horarioSeleccionado.hora
    );

    if (yaRegistrado) {
      alert("Ya estás registrado en esta clase con este horario");
      return;
    }

    guardadas.push({
      nombre: claseSeleccionada.nombre,
      imagen: claseSeleccionada.img,
      dia: horarioSeleccionado.dia,
      hora: horarioSeleccionado.hora,
      instructor: horarioSeleccionado.instructor
    });

    localStorage.setItem(key, JSON.stringify(guardadas));
    alert(`✅ Te registraste en ${claseSeleccionada.nombre}\n${horarioSeleccionado.dia} ${horarioSeleccionado.hora}\nInstructor: ${horarioSeleccionado.instructor}`);
    setClaseSeleccionada(null);
    setHorarioSeleccionado(null);
  };

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
              onClick={() => {
                setClaseSeleccionada(c);
                setHorarioSeleccionado(null);
              }}
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

      {/* MODAL - SELECCIÓN DE HORARIOS */}
      {claseSeleccionada && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>📅 {claseSeleccionada.nombre} - Elige tu horario</h5>
                <button 
                  className="btn-close" 
                  onClick={() => {
                    setClaseSeleccionada(null);
                    setHorarioSeleccionado(null);
                  }} 
                />
              </div>
              <div className="modal-body">
                <img 
                  src={claseSeleccionada.img} 
                  className="img-fluid rounded mb-3" 
                  alt={claseSeleccionada.nombre}
                />
                
                <h6 className="mb-3">Horarios Disponibles:</h6>
                
                <div className="horarios-list">
                  {claseSeleccionada.horarios.map((horario, index) => (
                    <div 
                      key={index}
                      className={`horario-item ${horarioSeleccionado === horario ? 'selected' : ''}`}
                      onClick={() => setHorarioSeleccionado(horario)}
                    >
                      <div className="horario-info">
                        <span className="dia">{horario.dia}</span>
                        <span className="hora">{horario.hora}</span>
                      </div>
                      <div className="instructor-info">
                        👤 {horario.instructor}
                      </div>
                      {horarioSeleccionado === horario && (
                        <div className="check-mark">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-success" 
                  onClick={registrarClase}
                  disabled={!horarioSeleccionado}
                >
                  {horarioSeleccionado ? '✅ Registrarme' : '⚠️ Selecciona un horario'}
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