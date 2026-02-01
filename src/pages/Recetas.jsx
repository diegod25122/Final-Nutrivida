import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/recetas.css";

function Recetas() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [filtroActivo, setFiltroActivo] = useState("Todos");
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

    // Base de datos de recetas
    const recetas = [
        // ========== SALUD ==========
        {
            id: 1,
            nombre: "Ensalada Mediterránea",
            categoria: "Salud",
            calorias: 350,
            proteinas: 12,
            carbohidratos: 25,
            grasas: 18,
            tiempo: "15 min",
            dificultad: "Fácil",
            imagen: "/images/ensalada_mediterranea.jpeg",
            ingredientes: [
                "200g de lechuga mixta",
                "100g de tomates cherry",
                "50g de pepino",
                "30g de queso feta",
                "10 aceitunas negras",
                "2 cdas de aceite de oliva",
                "Jugo de medio limón"
            ],
            preparacion: [
                "Lava y corta todas las verduras en trozos medianos",
                "Mezcla la lechuga, tomates y pepino en un bowl grande",
                "Agrega las aceitunas y el queso feta desmenuzado",
                "Prepara el aderezo mezclando aceite de oliva con jugo de limón",
                "Vierte el aderezo sobre la ensalada y mezcla bien",
                "Sirve inmediatamente"
            ],
            beneficios: "Rica en antioxidantes, vitaminas y grasas saludables. Perfecta para mantener un estilo de vida equilibrado."
        },
        {
            id: 2,
            nombre: "Bowl de Quinoa y Vegetales",
            categoria: "Salud",
            calorias: 420,
            proteinas: 15,
            carbohidratos: 55,
            grasas: 12,
            tiempo: "25 min",
            dificultad: "Fácil",
            imagen: "/images/browln_quinoa_verduras.jpeg",
            ingredientes: [
                "1 taza de quinoa",
                "1 zanahoria rallada",
                "1 pimiento rojo",
                "100g de brócoli",
                "1 aguacate",
                "Semillas de chía",
                "Aceite de oliva y limón"
            ],
            preparacion: [
                "Cocina la quinoa según las instrucciones del paquete",
                "Cocina al vapor el brócoli durante 5 minutos",
                "Corta el pimiento en tiras y saltéalo ligeramente",
                "En un bowl, coloca la quinoa como base",
                "Añade los vegetales en secciones",
                "Decora con aguacate y semillas de chía",
                "Aliña con aceite de oliva y limón"
            ],
            beneficios: "Proteína completa, alto contenido de fibra y micronutrientes esenciales."
        },

        // ========== PERDER PESO ==========
        {
            id: 3,
            nombre: "Pollo a la Plancha con Verduras",
            categoria: "Perder Peso",
            calorias: 280,
            proteinas: 35,
            carbohidratos: 15,
            grasas: 8,
            tiempo: "20 min",
            dificultad: "Fácil",
            imagen: "/images/pollo_plancha_verduras.jpeg",
            ingredientes: [
                "150g de pechuga de pollo",
                "1 calabacín",
                "1 berenjena",
                "Espárragos verdes",
                "Especias al gusto",
                "1 cda de aceite de oliva"
            ],
            preparacion: [
                "Sazona el pollo con especias (ajo, pimienta, pimentón)",
                "Calienta una plancha o sartén antiadherente",
                "Cocina el pollo 5-6 minutos por cada lado",
                "Corta las verduras en rodajas",
                "Cocina las verduras a la plancha hasta que estén tiernas",
                "Sirve el pollo acompañado de las verduras",
                "Agrega un chorrito de limón al servir"
            ],
            beneficios: "Alto en proteína, bajo en calorías. Ideal para pérdida de grasa manteniendo masa muscular."
        },
        {
            id: 4,
            nombre: "Sopa Detox de Vegetales",
            categoria: "Perder Peso",
            calorias: 180,
            proteinas: 8,
            carbohidratos: 28,
            grasas: 3,
            tiempo: "30 min",
            dificultad: "Fácil",
            imagen: "/images/sopa_detox.jpg",
            ingredientes: [
                "2 zanahorias",
                "2 tallos de apio",
                "1 calabacín",
                "1 cebolla",
                "2 dientes de ajo",
                "1 litro de caldo de verduras",
                "Especias (cúrcuma, jengibre)"
            ],
            preparacion: [
                "Pica todas las verduras en cubos pequeños",
                "En una olla, sofríe la cebolla y ajo",
                "Agrega las demás verduras y cocina 3 minutos",
                "Vierte el caldo de verduras",
                "Añade las especias al gusto",
                "Cocina a fuego medio 20 minutos",
                "Sirve caliente con perejil fresco"
            ],
            beneficios: "Muy baja en calorías, rica en fibra. Ayuda a la digestión y mantiene la saciedad."
        },
        {
            id: 5,
            nombre: "Ensalada de Atún y Espinacas",
            categoria: "Perder Peso",
            calorias: 250,
            proteinas: 28,
            carbohidratos: 12,
            grasas: 10,
            tiempo: "10 min",
            dificultad: "Muy Fácil",
            imagen: "/images/ensalada_atun_espinacas.jpeg",
            ingredientes: [
                "150g de atún en agua",
                "2 tazas de espinacas frescas",
                "1 tomate",
                "Pepino",
                "Cebolla morada",
                "Vinagre balsámico",
                "1 cdta de aceite de oliva"
            ],
            preparacion: [
                "Lava bien las espinacas y escúrrelas",
                "Corta el tomate, pepino y cebolla en rodajas finas",
                "Mezcla las verduras en un bowl",
                "Agrega el atún escurrido",
                "Prepara el aderezo con vinagre y aceite",
                "Mezcla todo y sirve fresco"
            ],
            beneficios: "Alto contenido proteico con mínimas calorías. Omega-3 del atún ayuda a la quema de grasa."
        },

        // ========== GANAR MÚSCULO ==========
        {
            id: 6,
            nombre: "Batido Proteico de Plátano",
            categoria: "Ganar Músculo",
            calorias: 480,
            proteinas: 35,
            carbohidratos: 60,
            grasas: 12,
            tiempo: "5 min",
            dificultad: "Muy Fácil",
            imagen: "/images/batido_proteico_platano.jpeg",
            ingredientes: [
                "1 plátano maduro",
                "1 scoop de proteína en polvo",
                "250ml de leche",
                "2 cdas de avena",
                "1 cda de mantequilla de maní",
                "Hielo al gusto"
            ],
            preparacion: [
                "Coloca todos los ingredientes en la licuadora",
                "Licúa durante 30-40 segundos hasta obtener una mezcla homogénea",
                "Agrega más leche si prefieres una consistencia más líquida",
                "Sirve inmediatamente después del entrenamiento"
            ],
            beneficios: "Perfecto post-entrenamiento. Combina proteína de rápida absorción con carbohidratos para recuperación muscular."
        },
        {
            id: 7,
            nombre: "Pasta Integral con Pechuga y Brócoli",
            categoria: "Ganar Músculo",
            calorias: 620,
            proteinas: 45,
            carbohidratos: 75,
            grasas: 15,
            tiempo: "25 min",
            dificultad: "Media",
            imagen: "/images/pasta_intergral_brocoli.jpeg",
            ingredientes: [
                "200g de pasta integral",
                "200g de pechuga de pollo",
                "150g de brócoli",
                "2 dientes de ajo",
                "2 cdas de aceite de oliva",
                "Queso parmesano rallado",
                "Sal y pimienta"
            ],
            preparacion: [
                "Cocina la pasta según las instrucciones del paquete",
                "Corta el pollo en cubos y sazónalo",
                "En un sartén, cocina el pollo hasta dorarlo",
                "Cocina el brócoli al vapor durante 5 minutos",
                "Saltea el ajo en aceite de oliva",
                "Mezcla la pasta, pollo y brócoli",
                "Sirve con queso parmesano por encima"
            ],
            beneficios: "Carbohidratos complejos para energía sostenida, proteína de alta calidad y vegetales para micronutrientes."
        },
        {
            id: 8,
            nombre: "Salmón con Arroz Integral y Aguacate",
            categoria: "Ganar Músculo",
            calorias: 680,
            proteinas: 42,
            carbohidratos: 55,
            grasas: 28,
            tiempo: "30 min",
            dificultad: "Media",
            imagen: "/images/salmon_arroz_aguacate.jpeg",
            ingredientes: [
                "180g de filete de salmón",
                "1 taza de arroz integral",
                "1 aguacate",
                "Espárragos",
                "Limón",
                "Aceite de oliva",
                "Especias (eneldo, ajo en polvo)"
            ],
            preparacion: [
                "Cocina el arroz integral según instrucciones",
                "Sazona el salmón con especias y limón",
                "Cocina el salmón al horno a 180°C por 15 minutos",
                "Cocina los espárragos al vapor",
                "Corta el aguacate en láminas",
                "Sirve el salmón sobre el arroz",
                "Acompaña con aguacate y espárragos"
            ],
            beneficios: "Omega-3 para recuperación muscular, proteína completa y grasas saludables. Carbohidratos de bajo índice glucémico."
        },

        // ========== UNIVERSALES ==========
        {
            id: 9,
            nombre: "Tortilla de Claras con Vegetales",
            categoria: "Salud",
            calorias: 220,
            proteinas: 24,
            carbohidratos: 10,
            grasas: 8,
            tiempo: "10 min",
            dificultad: "Fácil",
            imagen: "/images/tortilla_con_vegetales.jpg",
            ingredientes: [
                "4 claras de huevo",
                "1 huevo entero",
                "Espinacas",
                "Champiñones",
                "Tomate",
                "Cebolla",
                "Especias"
            ],
            preparacion: [
                "Bate las claras y el huevo en un bowl",
                "Pica los vegetales en trozos pequeños",
                "Calienta un sartén antiadherente",
                "Agrega los vegetales y cocina 2 minutos",
                "Vierte la mezcla de huevo",
                "Cocina a fuego medio hasta que cuaje",
                "Dobla por la mitad y sirve"
            ],
            beneficios: "Desayuno ideal, alto en proteínas, bajo en calorías y carbohidratos."
        },
        {
            id: 10,
            nombre: "Bowl de Yogurt Griego con Frutas",
            categoria: "Salud",
            calorias: 320,
            proteinas: 20,
            carbohidratos: 38,
            grasas: 8,
            tiempo: "5 min",
            dificultad: "Muy Fácil",
            imagen: "/images/browln_yogurt_frutas.jpeg",
            ingredientes: [
                "200g de yogurt griego natural",
                "1 plátano",
                "Fresas",
                "Arándanos",
                "2 cdas de granola",
                "1 cda de miel",
                "Semillas de chía"
            ],
            preparacion: [
                "Coloca el yogurt griego en un bowl",
                "Corta las frutas en rodajas",
                "Distribuye las frutas sobre el yogurt",
                "Agrega la granola",
                "Espolvorea semillas de chía",
                "Vierte un poco de miel por encima",
                "Disfruta inmediatamente"
            ],
            beneficios: "Probióticos para la salud digestiva, proteína de alta calidad y antioxidantes de las frutas."
        }
    ];

    useEffect(() => {
        const logueado = localStorage.getItem("logueado");
        if (!logueado || logueado !== "true") {
            alert("Debes iniciar sesión para ver las recetas");
            navigate("/login");
            return;
        }

        // Obtener objetivo del usuario
        const userData = JSON.parse(localStorage.getItem("usuarioData"));
        if (userData) {
            setUsuario(userData);
            setFiltroActivo(userData.objetivo);
        }
    }, [navigate]);

    const recetasFiltradas = filtroActivo === "Todos"
        ? recetas
        : recetas.filter(r => r.categoria === filtroActivo);

    return (
        <div className="recetas-container">

            {/* HEADER */}
            <section className="recetas-header">
                <h1>🍽️ Recetas Recomendadas</h1>
                {usuario && (
                    <p className="user-objective">
                        Tu objetivo: <strong>{usuario.objetivo}</strong>
                    </p>
                )}
            </section>

            {/* FILTROS */}
            <section className="filtros-section">
                <div className="filtros-buttons">
                    {["Todos", "Salud", "Perder Peso", "Ganar Músculo"].map((filtro) => (
                        <button
                            key={filtro}
                            className={`filtro-btn ${filtroActivo === filtro ? 'active' : ''}`}
                            onClick={() => setFiltroActivo(filtro)}
                        >
                            {filtro}
                        </button>
                    ))}
                </div>
            </section>

            {/* GRID DE RECETAS */}
            <section className="recetas-grid">
                {recetasFiltradas.map((receta) => (
                    <div
                        key={receta.id}
                        className="receta-card"
                        onClick={() => setRecetaSeleccionada(receta)}
                    >
                        <div className="receta-image">
                            <img src={receta.imagen} alt={receta.nombre} />
                            <span className="categoria-badge">{receta.categoria}</span>
                        </div>

                        <div className="receta-info">
                            <h3>{receta.nombre}</h3>

                            <div className="receta-stats">
                                <span className="stat">
                                    <strong>{receta.calorias}</strong> kcal
                                </span>
                                <span className="stat">
                                    <strong>{receta.proteinas}g</strong> proteína
                                </span>
                            </div>

                            <div className="receta-meta">
                                <span>⏱️ {receta.tiempo}</span>
                                <span>📊 {receta.dificultad}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* MODAL DETALLE DE RECETA */}
            {recetaSeleccionada && (
                <div className="modal-overlay" onClick={() => setRecetaSeleccionada(null)}>
                    <div className="modal-receta" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="btn-close-modal-receta"
                            onClick={() => setRecetaSeleccionada(null)}
                        >
                            ✕
                        </button>

                        <div className="modal-receta-header">
                            <img src={recetaSeleccionada.imagen} alt={recetaSeleccionada.nombre} />
                            <div className="modal-receta-title">
                                <h2>{recetaSeleccionada.nombre}</h2>
                                <span className="categoria-badge">{recetaSeleccionada.categoria}</span>
                            </div>
                        </div>

                        <div className="modal-receta-body">

                            {/* INFORMACIÓN NUTRICIONAL */}
                            <div className="info-nutricional">
                                <h3>📊 Información Nutricional</h3>
                                <div className="nutri-grid">
                                    <div className="nutri-item">
                                        <span className="nutri-label">Calorías</span>
                                        <span className="nutri-value">{recetaSeleccionada.calorias} kcal</span>
                                    </div>
                                    <div className="nutri-item">
                                        <span className="nutri-label">Proteínas</span>
                                        <span className="nutri-value">{recetaSeleccionada.proteinas}g</span>
                                    </div>
                                    <div className="nutri-item">
                                        <span className="nutri-label">Carbohidratos</span>
                                        <span className="nutri-value">{recetaSeleccionada.carbohidratos}g</span>
                                    </div>
                                    <div className="nutri-item">
                                        <span className="nutri-label">Grasas</span>
                                        <span className="nutri-value">{recetaSeleccionada.grasas}g</span>
                                    </div>
                                </div>
                            </div>

                            {/* INGREDIENTES */}
                            <div className="ingredientes-section">
                                <h3>🛒 Ingredientes</h3>
                                <ul>
                                    {recetaSeleccionada.ingredientes.map((ing, index) => (
                                        <li key={index}>{ing}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* PREPARACIÓN */}
                            <div className="preparacion-section">
                                <h3>👨‍🍳 Preparación</h3>
                                <ol>
                                    {recetaSeleccionada.preparacion.map((paso, index) => (
                                        <li key={index}>{paso}</li>
                                    ))}
                                </ol>
                            </div>

                            {/* BENEFICIOS */}
                            <div className="beneficios-section">
                                <h3>💪 Beneficios</h3>
                                <p>{recetaSeleccionada.beneficios}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Recetas;