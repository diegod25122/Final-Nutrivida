import "../CSS/Style.css";
import "../CSS/about.css";

function About() {
  return (
    <>
      {/* ABOUT */}
      <section className="about fondo-verde">
        <h1>Sobre Nosotros</h1>
        <p>
          En NUTRI•VIDA creemos que la salud y el bienestar se logran con balance,
          nutrición adecuada y constancia. Nuestro objetivo es acompañarte a
          alcanzar una vida más activa, plena y saludable.
        </p>

        <div className="about-cards">
          <div className="about-card">
            <img src="/images/alimentacionSaludable.jpg" alt="Dieta saludable" />
            <h3>Planes de Alimentación</h3>
            <p>
              Ofrecemos guías adaptadas para cada objetivo: pérdida de grasa,
              ganancia muscular, energía o bienestar general.
            </p>
          </div>

          <div className="about-card">
            <img src="/images/Entrenamiento_Personalizados.webp" alt="Entrenamiento" />
            <h3>Entrenamientos Personalizados</h3>
            <p>
              Rutinas estructuradas por expertos, ajustadas a tu nivel físico y
              tiempo disponible.
            </p>
          </div>

          <div className="about-card">
            <img src="/images/comunidad.jpeg" alt="Comunidad" />
            <h3>Comunidad Activa</h3>
            <p>
              Forma parte de una red de apoyo donde todos compartimos el mismo
              objetivo: una vida saludable.
            </p>
          </div>
        </div>

        <h2>Tipos de Dietas</h2>
        <ul className="diet-list">
          <li>
            <b>Keto:</b> Alta en grasas saludables, baja en carbohidratos para
            quemar grasa rápidamente.
          </li>
          <li>
            <b>Balanceada:</b> Ideal para mantener peso y energía durante el día.
          </li>
          <li>
            <b>Vegetariana:</b> Enfocada en proteínas vegetales, frutas y
            cereales.
          </li>
          <li>
            <b>Alta en Proteínas:</b> Perfecta para aumentar masa muscular y
            recuperación post entrenamiento.
          </li>
        </ul>

        <div className="about-extra">
          <h2>¿Por qué elegir NUTRI•VIDA?</h2>
          <div className="about-benefits">
            <div>✔ Atención personalizada</div>
            <div>✔ Profesionales certificados</div>
            <div>✔ Seguimiento de progreso</div>
            <div>✔ Comunidad activa</div>
          </div>
        </div>
      </section>

      {/* ENTRENADORES */}
      <section className="trainers-section neon-box">
        <h2 className="neon-title">🏋️‍♂️ Entrenadores Destacados</h2>
        <p className="neon-sub">
          Profesionales dedicados a tu bienestar y rendimiento
        </p>

        <div className="trainers-container">
          <div className="trainer-card">
            <img src="/images/trainer1.jpg" alt="Entrenador 1" />
            <h3>María López</h3>
            <p className="trainer-specialty">
              Especialista en Yoga & Mindfulness
            </p>
            <p className="trainer-desc">
              Más de 8 años guiando a personas hacia una vida equilibrada.
            </p>
          </div>

          <div className="trainer-card">
            <img src="/images/trainer2.jpg" alt="Entrenador 2" />
            <h3>Carlos Rivera</h3>
            <p className="trainer-specialty">
              Entrenador de Fuerza & Culturismo
            </p>
            <p className="trainer-desc">
              Preparador físico certificado y campeón nacional.
            </p>
          </div>

          <div className="trainer-card">
            <img src="/images/trainer3.jpg" alt="Entrenador 3" />
            <h3>Camila Torres</h3>
            <p className="trainer-specialty">
              Experta en Pilates & Rehabilitación
            </p>
            <p className="trainer-desc">
              Ayuda a recuperar movilidad y mejorar postura.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
