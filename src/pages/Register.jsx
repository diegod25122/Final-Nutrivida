import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
        <div className="register-main-container">
            <div className="register-content-card">
                <div className="register-left-info">
                    <h1>Únete a <span>NUTRI•VIDA</span></h1>
                    <p>Configura tu perfil para empezar tu cambio.</p>
                    <img src="/images/saludable.jpg" alt="Salud" className="side-img" />
                </div>

                <div className="register-right-form">
                    <h2>Crea tu Perfil</h2>
                    <form onSubmit={handleSubmit} className="register-form-grid">
                        <div className="full-width">
                            <label>Nombre Completo</label>
                            <input type="text" name="nombre" placeholder="Ej. Juan Pérez" onChange={handleChange} required />
                        </div>
                        <div className="half-width">
                            <label>Edad</label>
                            <input type="number" name="edad" onChange={handleChange} required />
                        </div>
                        <div className="half-width">
                            <label>Peso (kg)</label>
                            <input type="number" step="0.1" name="peso" onChange={handleChange} required />
                        </div>
                        <div className="full-width">
                            <button className="btn-finalizar" type="submit">Finalizar Registro</button>
                        </div>
                    </form>
                    <p className="login-redirect">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    );
}
