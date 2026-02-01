import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import "../CSS/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    edad: '',
    peso: '',
    estatura: '',
    sexo: '',
    objetivo: 'Salud',
    foto: null
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      // 1️⃣ Crear usuario en Firebase Auth
      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2️⃣ Guardar datos del perfil en Firestore
      await setDoc(doc(db, "usuarios", cred.user.uid), {
        uid: cred.user.uid,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        email: formData.email,
        edad: formData.edad,
        peso: formData.peso,
        estatura: formData.estatura,
        sexo: formData.sexo,
        objetivo: formData.objetivo,
        foto: formData.foto,
        creadoEn: new Date()
      });

      alert("¡Cuenta creada con éxito! 💪🔥");
      navigate("/login");

    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
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
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                placeholder="Ej. Juan"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-item">
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                placeholder="Ej. Pérez García"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-item full-row">
            <label>Foto de Perfil (Opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          </div>

          <div className="input-row triplet">
            <div className="input-item">
              <label>Edad</label>
              <input
                type="number"
                name="edad"
                placeholder="Años"
                min="1"
                max="120"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-item">
              <label>Peso (kg)</label>
              <input
                type="number"
                name="peso"
                placeholder="0.0"
                step="0.1"
                min="1"
                value={formData.peso}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-item">
              <label>Estatura (cm)</label>
              <input
                type="number"
                name="estatura"
                placeholder="cm"
                min="50"
                max="250"
                value={formData.estatura}
                onChange={handleChange}
                required
              />
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
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-item full-row">
            <label>Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mínimo 6 caracteres"
                minLength="6"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
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