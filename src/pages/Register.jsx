import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../CSS/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    usuario: '',
    email: '',
    password: '',
    edad: '',
    peso: '',
    estatura: '',
    sexo: '',
    objetivo: 'Salud',
    foto: null
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
      setFormData({ ...formData, foto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("usuarioNV", JSON.stringify(formData));
    alert("¡Cuenta creada con éxito! 💪");
    navigate("/login");
  };

  return (
    <div className="new-register-view">
      <div className="register-box">
        <div className="register-header">
          <h2>Únete a <br /><span>NUTRI•VIDA</span></h2>
          <p>Al registrarte, nuestro sistema calculará tu plan basado en tus medidas y objetivos.</p>
          <div className="reg-steps">
            <div className="step"><span>1</span> Perfil Nutricional</div>
            <div className="step"><span>2</span> Plan Personalizado</div>
            <div className="step"><span>3</span> Acceso a Clases</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-grid">
          <h3>Crea tu Perfil <span>Profesional</span></h3>

          <div className="input-row">
            <div className="input-item">
              <label>Nombre Completo</label>
              <input type="text" name="nombres" placeholder="Ej. Juan Pérez" onChange={handleChange} required />
            </div>
            <div className="input-item">
              <label>Foto de Perfil</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
            </div>
          </div>

          <div className="input-row triplet">
            <div className="input-item">
              <label>Edad</label>
              <input type="number" name="edad" placeholder="Años" onChange={handleChange} required />
            </div>
            <div className="input-item">
              <label>Peso (kg)</label>
              <input type="number" name="peso" placeholder="0.0" onChange={handleChange} required />
            </div>
            <div className="input-item">
              <label>Estatura (cm)</label>
              <input type="number" name="estatura" placeholder="cm" onChange={handleChange} required />
            </div>
          </div>

          <div className="input-row">
            <div className="input-item">
              <label>Sexo</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className="input-item">
              <label>Objetivo</label>
              <select name="objetivo" value={formData.objetivo} onChange={handleChange}>
                <option value="Salud">Salud</option>
                <option value="Perder Peso">Perder Peso</option>
                <option value="Ganar Músculo">Ganar Músculo</option>
              </select>
            </div>
          </div>

          <div className="input-item full-row">
            <label>Correo Electrónico</label>
            <input type="email" name="email" placeholder="correo@ejemplo.com" onChange={handleChange} required />
          </div>

          <div className="input-item full-row">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="Mínimo 6 caracteres" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-save">Finalizar Registro</button>

          <div className="footer-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
