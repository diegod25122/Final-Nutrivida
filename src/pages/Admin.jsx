import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    // 🔒 PROTEGER RUTA ADMIN
    useEffect(() => {
        const rol = localStorage.getItem("rol");
        if (rol !== "admin") {
            navigate("/login");
        }
    }, [navigate]);

    // 🔌 CARGAR SCRIPTS EXTERNOS
    useEffect(() => {
        const bootstrapScript = document.createElement("script");
        bootstrapScript.src =
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        bootstrapScript.async = true;

        const swalScript = document.createElement("script");
        swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        swalScript.async = true;

        document.body.appendChild(bootstrapScript);
        document.body.appendChild(swalScript);

        return () => {
            document.body.removeChild(bootstrapScript);
            document.body.removeChild(swalScript);
        };
    }, []);
    useEffect(() => {
        const salirBtn = document.getElementById("btnSalir");

        if (salirBtn) {
            salirBtn.onclick = () => {
                localStorage.clear();
                navigate("/login");
            };
        }
    }, [navigate]);


    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>THE BANK | Panel de Administración</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">

<style>
:root { --bank-dark: rgb(0, 21, 41); --bank-accent: #1890ff; }
body { background-color: #f0f2f5; font-family: 'Segoe UI', sans-serif; }

.admin-sidebar { background: var(--bank-dark); color: white; min-height: 100vh; }
.nav-link { color: rgba(255,255,255,0.7); transition: 0.3s; padding: 15px 20px; cursor:pointer; }
.nav-link:hover, .nav-link.active { color: white; background: var(--bank-accent); }

.admin-title { color: #ffffff; }

.table-container {
  background: white; border-radius: 10px; padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
</style>
</head>

<body>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-2 p-0 admin-sidebar">
      <div class="p-4 text-center border-bottom border-secondary">
        <h6 class="mt-2 mb-0 fw-bold">ADMIN PORTAL</h6>
      </div>

      <nav class="mt-3">
        <a class="nav-link active d-block text-decoration-none">
          <i class="bi bi-people me-2"></i> Gestión de Clientes
        </a>

        <!-- 🔥 BOTÓN SALIR ARREGLADO -->
        <button id="btnSalir" class="nav-link d-block text-decoration-none mt-5 bg-transparent border-0 text-start w-100">
  <i class="bi bi-box-arrow-left me-2"></i> Salir
</button>

      </nav>
    </div>

    <div class="col-md-10 p-5">
      <h3 class="fw-bold mb-4 admin-title">
        Gestión de Clientes - Nutrivida
      </h3>

      <div class="table-container">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Nro. Cuenta</th>
              <th>Cliente</th>
              <th>Cédula</th>
              <th>Saldo</th>
              <th>Estado</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody id="tablaAdminCuentas"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</body>
</html>
        `,
            }}
        />
    );
}

export default Admin;
