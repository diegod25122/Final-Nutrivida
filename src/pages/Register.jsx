import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../CSS/register.css";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '', edad: '', sexo: '', peso: '',
        estatura: '', email: '', password: '',
        objetivo: '', fotoPerfil: null
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
        alert("¡Registro profesional guardado!");
        navigate("/login");
    };

    return (
        <div className="register-page-wrapper">
            <Navbar />
            
            <section className="register-section" style={{ marginTop: '80px' }}>
                <div className="register-container">
                    
                    {/* LADO IZQUIERDO: Usando tus clases de register.css */}
                    <div className="register-left">
                        <h1>Únete a <span>NUTRI•VIDA</span></h1>
                        <p>Calcularemos tu plan basado en tus medidas y objetivos.</p>
                        <ul className="steps-list" style={{ color: 'white', listStyle: 'none', padding: 0 }}>
                            <li>✅ Perfil Nutricional</li>
                            <li>✅ Plan Personalizado</li>
                            <li>✅ Acceso a Clases</li>
                        </ul>
                        {/* Asegúrate de que esta imagen exista en public/images/ */}
                        <img src="/images/saludable.jpg" alt="NutriVida" style={{ borderRadius: '15px', maxWidth: '100%' }} />
                    </div>

                    {/* LADO DERECHO: El Formulario Profesional */}
                    <div className="register-right">
                        <h2>Crea tu Perfil</h2>
                        <form onSubmit={handleSubmit} className="register-grid">
                            
                            <div className="full">
                                <label>Nombre Completo</label>
                                <input type="text" name="nombre" placeholder="Ej. Juan Pérez" onChange={handleChange} required />
                            </div>

                            <div className="form-item">
                                <label>Edad</label>
                                <input type="number" name="edad" placeholder="Años" onChange={handleChange} required />
                            </div>

                            <div className="form-item">
                                <label>Sexo</label>
                                <select name="sexo" onChange={handleChange} required>
                                    <option value="">Seleccionar...</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>

                            <div className="form-item">
                                <label>Peso (kg)</label>
                                <input type="number" name="peso" step="0.1" placeholder="0.0" onChange={handleChange} required />
                            </div>

                            <div className="form-item">
                                <label>Estatura (cm)</label>
                                <input type="number" name="estatura" placeholder="cm" onChange={handleChange} required />
                            </div>

                            <div className="full">
                                <label>Objetivo</label>
                                <select name="objetivo" onChange={handleChange} required style={{ width: '100%' }}>
                                    <option value="">Seleccionar...</option>
                                    <option value="perder_peso">Perder Peso</option>
                                    <option value="ganar_musculo">Ganar Músculo</option>
                                    <option value="salud">Mantenerse Saludable</option>
                                </select>
                            </div>

                            <div className="full">
                                <label>Correo Electrónico</label>
                                <input type="email" name="email" placeholder="correo@ejemplo.com" onChange={handleChange} required />
                            </div>

                            <div className="full">
                                <label>Contraseña</label>
                                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
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

            <Footer />
        </div>
    );
}
