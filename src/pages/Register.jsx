import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Style.css";
import "../CSS/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    sexo: '',
    peso: '',
    estatura: '',
    email: '',
    password: '',
    objetivo: '',
    fotoPerfil: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, fotoPerfil: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("usuarioNV", JSON.stringify(formData));

    console.log("Datos listos para Firebase:", formData);
    alert("¡Registro exitoso! Los datos de salud han sido guardados.");

    navigate("/login");
  };

  return (
    <div className="register-body">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            NUTRI<span className="text-success">•VIDA</span>
          </Link>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>

      <section className="register-section">
        <div className="register-container">
          <div className="register-left">
            <h1>Únete a <br /><span>NUTRI•VIDA</span></h1>
            <p>Calcularemos tu plan basado en tus medidas y objetivos.</p>
            <div className="reg-steps" style={{ textAlign: 'left', marginTop: '20px' }}>
              <div className="step"> Perfil Nutricional</div>
              <div className="step"> Plan Personalizado</div>
              <div className="step"> Acceso a Clases</div>
            </div>
            <img src="/images/saludable.jpg" alt="NutriVida" style={{ marginTop: '20px', borderRadius: '15px' }} />
          </div>

          <div className="register-right">
            <h2>Crea tu Perfil Profesional</h2>
            <form onSubmit={handleSubmit} className="register-grid">

              <div className="full">
                <label>Nombre Completo</label>
                <input type="text" name="nombre" placeholder="Ej. Juan Pérez" onChange={handleChange} required />
              </div>

              <div>
                <label>Edad</label>
                <input type="number" name="edad" placeholder="Años" onChange={handleChange} required />
              </div>

              <div>
                <label>Sexo</label>
                <select name="sexo" onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
              </div>

              <div>
                <label>Peso (kg)</label>
                <input type="number" name="peso" placeholder="0.0" step="0.1" onChange={handleChange} required />
              </div>

              <div>
                <label>Estatura (cm)</label>
                <input type="number" name="estatura" placeholder="cm" onChange={handleChange} required />
              </div>

              <div className="full">
                <label>Objetivo</label>
                <select name="objetivo" onChange={handleChange} required>
                  <option value="">Seleccionar...</option>
                  <option value="perder_peso">Perder Peso</option>
                  <option value="ganar_musculo">Ganar Músculo</option>
                  <option value="mantenerse">Mantenerse Saludable</option>
                </select>
              </div>

              <div className="full">
                <label>Correo Electrónico</label>
                <input type="email" name="email" placeholder="correo@ejemplo.com" onChange={handleChange} required />
              </div>

              <div className="full">
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="Mínimo 6 caracteres" onChange={handleChange} required />
              </div>

              <div className="full">
                <label>Foto de Perfil</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              <button className="btn-register full" type="submit">
                Finalizar Registro
              </button>
            </form>

            <p className="register-text">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
