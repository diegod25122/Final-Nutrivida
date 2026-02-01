import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ajusta la ruta según tu estructura
import "../CSS/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [formEdit, setFormEdit] = useState({});
  const [loading, setLoading] = useState(true);

  const [objetivoPasos, setObjetivoPasos] = useState(null);
  const [modalPasos, setModalPasos] = useState(false);
  const [inputPasos, setInputPasos] = useState("");

  const [objetivoCalorias, setObjetivoCalorias] = useState(null);

  const [tiempoEjercicio, setTiempoEjercicio] = useState(0);
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [modalCronometro, setModalCronometro] = useState(false);

  const [clasesInscritas, setClasesInscritas] = useState([]);

  useEffect(() => {
    cargarDatosUsuario();
  }, [navigate]);

  const cargarDatosUsuario = async () => {
    const logueado = localStorage.getItem("logueado");
    if (!logueado || logueado !== "true") {
      alert("Debes iniciar sesión para ver tu dashboard");
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Error: No se encontró el ID del usuario");
      navigate("/login");
      return;
    }

    try {
      // Cargar datos del usuario desde Firestore
      const docRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUsuario(userData);
        setFormEdit(userData);
        calcularCaloriasRecomendadas(userData);
      } else {
        alert("No se encontraron datos del usuario");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar tus datos");
    } finally {
      setLoading(false);
    }

    // Cargar objetivo de pasos (localStorage)
    const pasosGuardados = localStorage.getItem("objetivoPasos");
    if (pasosGuardados) setObjetivoPasos(pasosGuardados);

    // Cargar clases inscritas (localStorage)
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const clasesKey = `clases_${nombreUsuario}`;
    const clases = JSON.parse(localStorage.getItem(clasesKey)) || [];
    setClasesInscritas(clases);
  };

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

    const alturaM = estatura / 100;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormEdit({ ...formEdit, foto: reader.result }); // Guarda la imagen en base64
    };

    reader.readAsDataURL(file);
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
    const userId = localStorage.getItem("userId");

    try {
      const docRef = doc(db, "usuarios", userId);

      // 1. Preparamos el objeto con los nombres de campos exactos de tu base de datos
      const nuevosDatos = {
        nombres: formEdit.nombres,
        apellidos: formEdit.apellidos,
        email: formEdit.email,
        edad: Number(formEdit.edad),
        peso: Number(formEdit.peso),
        estatura: Number(formEdit.estatura),
        objetivo: formEdit.objetivo,
        foto: formEdit.foto || null
      };

      // 2. Actualizamos Firebase (Esto es lo que ve tu compañero)
      await updateDoc(docRef, nuevosDatos);

      // 3. Actualizamos React y LocalStorage (Esto es lo que ves tú)
      // Usamos 'nuevosDatos' para asegurar que el storage tenga el email actualizado
      const perfilCompleto = { ...usuario, ...nuevosDatos };

      setUsuario(perfilCompleto);
      setEditandoPerfil(false);

      // Recalculamos con los datos frescos
      calcularCaloriasRecomendadas(perfilCompleto);

      // Sobrescribimos el local storage con la info nueva
      localStorage.setItem("usuarioData", JSON.stringify(perfilCompleto));

      alert("✅ ¡Perfil actualizado! Los cambios se reflejarán en todo el sistema.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el perfil");
    }
  };

  if (loading) {
    return <div className="loading">Cargando tu dashboard...</div>;
  }

  if (!usuario) {
    return <div className="loading">Error al cargar datos</div>;
  }

  return (
    <div className="dashboard-container">

      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <div className="profile-photo">
            <img
              src={usuario.foto || "/images/perfil.jpg"}
              alt="Perfil"
            />
          </div>

          <h2>{usuario.nombres} {usuario.apellidos}</h2>

          {!editandoPerfil ? (
            <>
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
            </>
          ) : (
            <div className="edit-form">
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                value={formEdit.nombres}
                onChange={handleEditChange}
              />

              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formEdit.apellidos}
                onChange={handleEditChange}
              />

              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formEdit.email}
                onChange={handleEditChange}
              />

              <label>Foto de Perfil</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />

              <div className="input-row-edit">
                <div>
                  <label>Edad</label>
                  <input type="number" name="edad" value={formEdit.edad} onChange={handleEditChange} />
                </div>
                <div>
                  <label>Peso (kg)</label>
                  <input type="number" step="0.1" name="peso" value={formEdit.peso} onChange={handleEditChange} />
                </div>
              </div>

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

      <main className="dashboard-main">

        <section className="metrics-section">
          <h1>Análisis de Rendimiento y Hábitos de Gimnasio</h1>

          <div className="metrics-grid">

            <div
              className="metric-card clickable"
              onClick={() => setModalPasos(true)}
            >
              <div className="metric-icon">👟</div>
              <h3>Objetivo de Pasos</h3>
              <div className="metric-value">
                {objetivoPasos ? `${parseInt(objetivoPasos).toLocaleString()}` : "Establecer"}
              </div>
              <p className="metric-label">pasos diarios</p>
            </div>

            <div
              className="metric-card clickable"
              onClick={() => setModalCronometro(true)}
            >
              <div className="metric-icon">⏱️</div>
              <h3>Tiempo de Ejercicio</h3>
              <div className="metric-value">
                {formatearTiempo(tiempoEjercicio)}
              </div>
              <p className="metric-label">Click para cronómetro</p>
            </div>

            <div className="metric-card">
              <div className="metric-icon">🔥</div>
              <h3>Calorías Diarias</h3>
              <div className="metric-value">
                {objetivoCalorias || "Calculando..."}
              </div>
              <p className="metric-label">kcal recomendadas</p>
              <button
                className="btn-ver-recetas"
                onClick={() => navigate("/recetas")}
              >
                🍽️ Ver Recetas Recomendadas
              </button>
            </div>

          </div>
        </section>

        <section className="classes-table-section">
          <h2>Mis Clases Inscritas</h2>

          {clasesInscritas.length === 0 ? (
            <div className="no-classes">
              <p>📋 No estás inscrito en ninguna clase todavía</p>
              <button onClick={() => navigate("/classes")} className="btn-goto-classes">
                Ver Clases Disponibles
              </button>
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
                      <button
                        className="btn-exit-class"
                        onClick={() => salirDeClase(clase.nombre, clase.dia, clase.hora)}
                      >
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

      {modalPasos && (
        <div className="modal-overlay" onClick={() => setModalPasos(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Establecer Objetivo de Pasos</h3>
            <input
              type="number"
              placeholder="Ej: 10000"
              value={inputPasos}
              onChange={(e) => setInputPasos(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn-save" onClick={guardarObjetivoPasos}>
                ✅ Guardar
              </button>
              <button className="btn-cancel" onClick={() => setModalPasos(false)}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalCronometro && (
        <div className="modal-overlay" onClick={() => setModalCronometro(false)}>
          <div className="modal-content cronometro-modal" onClick={(e) => e.stopPropagation()}>
            <h3>⏱️ Cronómetro de Ejercicio</h3>
            <div className="cronometro-display">
              {formatearTiempo(tiempoEjercicio)}
            </div>
            <div className="cronometro-controls">
              {!cronometroActivo ? (
                <button className="btn-start" onClick={() => setCronometroActivo(true)}>
                  ▶️ Iniciar
                </button>
              ) : (
                <button className="btn-pause" onClick={() => setCronometroActivo(false)}>
                  ⏸️ Pausar
                </button>
              )}
              <button className="btn-reset" onClick={() => setTiempoEjercicio(0)}>
                🔄 Reiniciar
              </button>
            </div>
            <button className="btn-close-modal" onClick={() => setModalCronometro(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;