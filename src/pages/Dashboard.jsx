import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


import "../CSS/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [formEdit, setFormEdit] = useState({});

  const [objetivoPasos, setObjetivoPasos] = useState(null);
  const [modalPasos, setModalPasos] = useState(false);
  const [inputPasos, setInputPasos] = useState("");

  const [objetivoCalorias, setObjetivoCalorias] = useState(null);

  const [tiempoEjercicio, setTiempoEjercicio] = useState(0);
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [modalCronometro, setModalCronometro] = useState(false);

  const [clasesInscritas, setClasesInscritas] = useState([]);

  useEffect(() => {
    const logueado = localStorage.getItem("logueado");
    if (!logueado || logueado !== "true") {
      alert("Debes iniciar sesión para ver tu dashboard");
      navigate("/login");
      return;
    }

    const datosUsuario = JSON.parse(localStorage.getItem("usuarioNV"));
    if (datosUsuario) {
      setUsuario(datosUsuario);
      setFormEdit(datosUsuario);
      calcularCaloriasRecomendadas(datosUsuario);
    }

    const pasosGuardados = localStorage.getItem("objetivoPasos");
    if (pasosGuardados) setObjetivoPasos(pasosGuardados);

    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const clasesKey = `clases_${nombreUsuario}`;
    const clases = JSON.parse(localStorage.getItem(clasesKey)) || [];
    setClasesInscritas(clases);
  }, [navigate]);

  useEffect(() => {
    let intervalo;
    if (cronometroActivo) {
      intervalo = setInterval(() => {
        setTiempoEjercicio(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [cronometroActivo]);

  const calcularCaloriasRecomendadas = (datos) => {
    const { peso, estatura, edad, sexo, objetivo } = datos;
    if (!peso || !estatura || !edad || !sexo) return;

    let tmb;
    if (sexo === "Masculino") {
      tmb = 88.362 + (13.397 * peso) + (4.799 * estatura) - (5.677 * edad);
    } else {
      tmb = 447.593 + (9.247 * peso) + (3.098 * estatura) - (4.330 * edad);
    }

    let caloriasObjetivo = tmb * 1.55;
    if (objetivo === "Perder Peso") {
      caloriasObjetivo -= 500;
    } else if (objetivo === "Ganar Músculo") {
      caloriasObjetivo += 300;
    }

    setObjetivoCalorias(Math.round(caloriasObjetivo));
  };

  const guardarObjetivoPasos = () => {
    if (!inputPasos || inputPasos <= 0) {
      alert("Ingresa un número válido de pasos");
      return;
    }
    localStorage.setItem("objetivoPasos", inputPasos);
    setObjetivoPasos(inputPasos);
    setModalPasos(false);
    setInputPasos("");
  };

  const formatearTiempo = (segundos) => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const salirDeClase = (nombreClase, dia, hora) => {
    const confirmar = window.confirm(`¿Seguro que quieres salir de ${nombreClase}?\n${dia} ${hora}`);
    if (!confirmar) return;

    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const clasesKey = `clases_${nombreUsuario}`;
    const clasesActualizadas = clasesInscritas.filter(
      c => !(c.nombre === nombreClase && c.dia === dia && c.hora === hora)
    );

    localStorage.setItem(clasesKey, JSON.stringify(clasesActualizadas));
    setClasesInscritas(clasesActualizadas);
    alert(`Te has dado de baja de ${nombreClase}`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

const guardarCambiosPerfil = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("Sesión no válida");
      return;
    }

    // 🔥 ACTUALIZAR EN FIRESTORE
    const ref = doc(db, "usuarios", user.uid);

    await updateDoc(ref, {
      edad: formEdit.edad,
      peso: formEdit.peso,
      estatura: formEdit.estatura,
      objetivo: formEdit.objetivo,
      actualizadoEn: new Date()
    });

    // 💾 ACTUALIZAR LOCAL (para no romper nada)
    localStorage.setItem("usuarioNV", JSON.stringify(formEdit));
    setUsuario(formEdit);
    setEditandoPerfil(false);
    calcularCaloriasRecomendadas(formEdit);

    alert(" Perfil actualizado correctamente");

  } catch (error) {
    console.error(error);
    alert(" Error al actualizar perfil");
  }
};


  if (!usuario) {
    return <div className="loading">Cargando tu dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* --- SIDEBAR CORREGIDO --- */}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <div className="profile-photo">
            <img
              src={usuario.foto || "/images/perfil.jpg"}
              alt="Perfil"
            />
          </div>

          <h2 className="user-full-name">{usuario.nombres} {usuario.apellidos}</h2>

          {!editandoPerfil ? (
            <div className="profile-view-container">
              <div className="user-info">
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Edad:</strong> {usuario.edad} años</p>
                <p><strong>Peso:</strong> {usuario.peso} kg</p>
                <p><strong>Estatura:</strong> {usuario.estatura} cm</p>
                <p><strong>Sexo:</strong> {usuario.sexo}</p>
                <p><strong>Objetivo:</strong> {usuario.objetivo}</p>
              </div>

              <button
                className="btn-edit-profile"
                onClick={() => setEditandoPerfil(true)}
              >
                📝 Actualizar Perfil
              </button>
            </div>
          ) : (
            <div className="edit-form">
              <label>Edad</label>
              <input type="number" name="edad" value={formEdit.edad} onChange={handleEditChange} />
              
              <label>Peso (kg)</label>
              <input type="number" name="peso" value={formEdit.peso} onChange={handleEditChange} />
              
              <label>Estatura (cm)</label>
              <input type="number" name="estatura" value={formEdit.estatura} onChange={handleEditChange} />
              
              <label>Objetivo</label>
              <select name="objetivo" value={formEdit.objetivo} onChange={handleEditChange}>
                <option value="Salud">Salud</option>
                <option value="Perder Peso">Perder Peso</option>
                <option value="Ganar Músculo">Ganar Músculo</option>
              </select>

              <div className="edit-buttons">
                <button className="btn-save" onClick={guardarCambiosPerfil}>✅ Guardar</button>
                <button className="btn-cancel" onClick={() => setEditandoPerfil(false)}>❌ Cancelar</button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="dashboard-main">
        <section className="metrics-section">
          <h1>Análisis de Rendimiento y Hábitos de Gimnasio</h1>
          <div className="user-name-top"> <h2>{usuario.nombres} {usuario.apellidos}</h2> </div>
          
          <div className="metrics-grid">
            <div className="metric-card clickable" onClick={() => setModalPasos(true)}>
              <div className="metric-icon">👟</div>
              <h3>Objetivo de Pasos</h3>
              <div className="metric-value">
                {objetivoPasos ? `${parseInt(objetivoPasos).toLocaleString()}` : "Establecer"}
              </div>
              <p className="metric-label">pasos diarios</p>
            </div>

            <div className="metric-card clickable" onClick={() => setModalCronometro(true)}>
              <div className="metric-icon">⏱️</div>
              <h3>Tiempo de Ejercicio</h3>
              <div className="metric-value">{formatearTiempo(tiempoEjercicio)}</div>
              <p className="metric-label">Click para cronómetro</p>
            </div>

            <div className="metric-card">
              <div className="metric-icon">🔥</div>
              <h3>Calorías Diarias</h3>
              <div className="metric-value">{objetivoCalorias || "Calculando..."}</div>
              <p className="metric-label">kcal recomendadas</p>
            </div>
          </div>
        </section>

        <section className="classes-table-section">
          <h2>Mis Clases Inscritas</h2>
          {clasesInscritas.length === 0 ? (
            <div className="no-classes">
              <p>📋 No estás inscrito en ninguna clase todavía</p>
              <button onClick={() => navigate("/classes")} className="btn-goto-classes">Ver Clases Disponibles</button>
            </div>
          ) : (
            <table className="classes-table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Instructor</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {clasesInscritas.map((clase, index) => (
                  <tr key={index}>
                    <td>
                      <div className="class-info">
                        <img src={clase.imagen} alt={clase.nombre} />
                        <span>{clase.nombre}</span>
                      </div>
                    </td>
                    <td><strong>{clase.dia}</strong></td>
                    <td>{clase.hora}</td>
                    <td>👤 {clase.instructor}</td>
                    <td>
                      <button className="btn-exit-class" onClick={() => salirDeClase(clase.nombre, clase.dia, clase.hora)}>
                        🚪 Salir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      {/* --- MODALES --- */}
      {modalPasos && (
        <div className="modal-overlay" onClick={() => setModalPasos(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Establecer Objetivo de Pasos</h3>
            <input type="number" placeholder="Ej: 10000" value={inputPasos} onChange={(e) => setInputPasos(e.target.value)} />
            <div className="modal-buttons">
              <button className="btn-save" onClick={guardarObjetivoPasos}>✅ Guardar</button>
              <button className="btn-cancel" onClick={() => setModalPasos(false)}>❌ Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modalCronometro && (
        <div className="modal-overlay" onClick={() => setModalCronometro(false)}>
          <div className="modal-content cronometro-modal" onClick={(e) => e.stopPropagation()}>
            <h3>⏱️ Cronómetro de Ejercicio</h3>
            <div className="cronometro-display">{formatearTiempo(tiempoEjercicio)}</div>
            <div className="cronometro-controls">
              {!cronometroActivo ? (
                <button className="btn-start" onClick={() => setCronometroActivo(true)}>▶️ Iniciar</button>
              ) : (
                <button className="btn-pause" onClick={() => setCronometroActivo(false)}>⏸️ Pausar</button>
              )}
              <button className="btn-reset" onClick={() => setTiempoEjercicio(0)}>🔄 Reiniciar</button>
            </div>
            <button className="btn-close-modal" onClick={() => setModalCronometro(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;