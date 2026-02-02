import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";

import "../CSS/Style.css";

function Home() {

  // FRASES MOTIVACIONALES
  const frases = [
    "🌱 Cada día es una nueva oportunidad para mejorar y crecer.",
    "🚀 Tu único límite eres tú mismo, atrévete a superarte.",
    "🔥 La disciplina supera al talento cuando eres constante.",
    "👣 Pequeños pasos te llevan a grandes cambios con el tiempo.",
    "💚 Cree en ti y en tu proceso, todo será posible.",
    "☀️ Hoy es un buen día para empezar algo mejor para ti."
  ];


  const [fraseIndex, setFraseIndex] = useState(0);

  // SESIÓN (FIREBASE)

  const [logueado, setLogueado] = useState(false);


  // IMC
  const [recomendacion, setRecomendacion] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");


  useEffect(() => {
    // 🔄 Rotar frases
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 5000);

    // ESCUCHAR SESIÓN REAL DE FIREBASE
    const unsub = onAuthStateChanged(auth, (user) => {
      setLogueado(!!user);
    });

    return () => {
      clearInterval(intervalo);
      unsub();
    };
  }, []);


  // CALCULAR IMC

  const calcularIMC = (e) => {
    e.preventDefault();

    if (peso <= 0 || altura <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Ingresa valores correctos de peso y altura",
        confirmButtonColor: "#ff9800",
        background: "#1a1a1a",
        color: "#ffffff"
      });
      return;
    }

    const alturaMetros = altura / 100;
    const imc = (peso / (alturaMetros * alturaMetros)).toFixed(2);

    let estado = "";
    let color = "";

    if (imc < 18.5) {
      estado = "Bajo peso";
      color = "#03a9f4";
    } else if (imc < 25) {
      estado = "Peso normal";
      color = "#4caf50";
    } else if (imc < 30) {
      estado = "Sobrepeso";
      color = "#ff9800";
    } else {
      estado = "Obesidad";
      color = "#f44336";
    }

    setResultado(`Tu IMC es ${imc} (${estado})`);
    let consejo = "";
    if (estado === "Bajo peso") {
      consejo =
        "🥗 Tu cuerpo necesita más energía y nutrientes. Te recomendamos mejorar tu alimentación, aumentar el consumo de comidas balanceadas y, si es posible, consultar con un especialista para recibir una guía adecuada.";
    } else if (estado === "Peso normal") {
      consejo =
        "💪 ¡Vas por muy buen camino! Mantén una dieta equilibrada, una buena hidratación y actividad física regular para conservar tu bienestar y rendimiento.";
    } else if (estado === "Sobrepeso") {
      consejo =
        "🚶‍♂️ Pequeños cambios diarios pueden marcar la diferencia. Reducir alimentos ultraprocesados, moverte más durante el día y mantener constancia te ayudará a mejorar tu salud.";
    } else {
      consejo =
        "🩺 Es importante cuidar tu salud a largo plazo. Consultar con un profesional te permitirá crear un plan personalizado de alimentación y actividad física acorde a tus necesidades.";
    }


    setRecomendacion(consejo);


    Swal.fire({
      title: "Resultado de tu IMC",
      html: `
      <p style="font-size:18px">
        Tu IMC es <strong>${imc}</strong>
      </p>
      <p style="color:${color}; font-size:20px; font-weight:bold">
        ${estado}
      </p>
    `,
      icon: "info",
      confirmButtonColor: "#4caf50",
      background: "#1a1a1a",
      color: "#ffffff"
    });
  };


  return (
    <>
      {/* HERO */}
      <section className="hero container" style={{ marginTop: "120px" }}>
        <div className="row align-items-center">
          <div className="col-md-6 hero-text">
            <h1>VIVE MEJOR</h1>
            <p>Transforma tu alimentación y tu estilo de vida</p>

            <Link to="/about" className="btn btn-primary btn-lg">
              Conoce más
            </Link>
          </div>

          <div className="col-md-6 hero-img text-center">
            <img
              src="/images/saludable.jpg"
              className="img-fluid rounded"
              alt="Salud"
            />
          </div>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section className="programs container">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card h-100 text-center">
              <img src="/images/balance.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Fuel & Balance</h5>
                <p className="card-text">Optimiza tu energía</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 text-center">
              <img src="/images/train y power.jpg" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Train & Power</h5>
                <p className="card-text">Rutinas personalizadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRASES */}
      <section className="welcome text-center py-5">
        <h2>
          <span className="text-success">BIENVENIDO</span> AL EQUIPO
        </h2>
        <p className="mt-3">{frases[fraseIndex]}</p>
      </section>

      {/* IMC */}
      <section className="imc-section">
        <h2>Calcula tu IMC</h2>

        <form onSubmit={calcularIMC} className="imc-form">
          <input
            type="number"
            placeholder="Peso (kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Altura (m)"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />

          <button type="submit">Calcular IMC</button>
        </form>

        {resultado && (
          <>
            <p style={{ color: "#000", fontWeight: "bold" }} className="mt-3">
              {resultado}
            </p>

            <p
              style={{
                color: "#0f5132",
                fontSize: "16px",
                fontWeight: "500",
                marginTop: "10px",
                padding: "10px 14px",
                background: "#e6f4ea",
                borderLeft: "4px solid #198754",
                borderRadius: "6px"
              }}
            >
              {recomendacion}
            </p>

          </>
        )}

      </section>

      {/* JOIN / ESTADO SESIÓN */}
      <section className="join fade-in text-center">
        {logueado ? (
          <>
            <h3>💚 Ya eres parte de Nutri•Vida</h3>
            <p>Sigue entrenando y cuidando tu salud 💪</p>
          </>
        ) : (
          <>
            <h3>ÚNETE A NUTRI•VIDA HOY</h3>
            <Link to="/register" className="btn-join">
              Registrarme
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Home;
