import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Style.css";

function Home() {
  // ======================
  // FRASES MOTIVACIONALES
  // ======================
  const frases = [
    "Cada día es una nueva oportunidad para mejorar.",
    "Tu único límite eres tú mismo.",
    "La disciplina supera al talento.",
    "Pequeños pasos te llevan a grandes cambios.",
    "Cree en ti y todo será posible.",
    "Hoy es un buen día para empezar."
  ];

  const [fraseIndex, setFraseIndex] = useState(0);

  // ======================
  // SESIÓN
  // ======================
  const [logueado, setLogueado] = useState(false);

  // ======================
  // IMC
  // ======================
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    // Rotar frases
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 5000);

    // Verificar sesión
    const sesion = localStorage.getItem("logueado");
    if (sesion === "true") {
      setLogueado(true);
    }

    return () => clearInterval(intervalo);
  }, []);

  // ======================
  // CALCULAR IMC
  // ======================
  const calcularIMC = (e) => {
    e.preventDefault();

    if (peso <= 0 || altura <= 0) {
      alert("Ingresa valores válidos");
      return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let estado = "";

    if (imc < 18.5) estado = "Bajo peso";
    else if (imc < 25) estado = "Peso normal";
    else if (imc < 30) estado = "Sobrepeso";
    else estado = "Obesidad";

    setResultado(`Tu IMC es ${imc} (${estado})`);
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
          <p style={{ color: "#000", fontWeight: "bold" }} className="mt-3">
            {resultado}
          </p>
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
            <button
              onClick={() => window.open('/register', '_blank')}
              className="btn-join"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Registrarme
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default Home;
