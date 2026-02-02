import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.async = true;

    document.body.appendChild(bootstrapScript);

    return () => {
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  // BOTÓN SALIR
  useEffect(() => {
    const salirBtn = document.getElementById("btnSalir");
    if (salirBtn) {
      salirBtn.onclick = () => {
        localStorage.clear();
        navigate("/login");
      };
    }
  }, [navigate]);

  //CARGAR USUARIOS DESDE FIRESTORE
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const ref = collection(db, "usuarios");
    const snapshot = await getDocs(ref);

    const tbody = document.getElementById("tablaAdminCuentas");
    if (!tbody) return;

    tbody.innerHTML = "";

    snapshot.forEach((docu) => {
      const u = docu.data();

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${docu.id}</td>
        <td>${u.nombres || ""} ${u.apellidos || ""}</td>
        <td>${u.email || ""}</td>
        <td>${u.edad || ""}</td>
        <td>${u.sexo || ""}</td>
        <td>${u.objetivo || ""}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-danger">Eliminar</button>
        </td>
      `;

      tr.querySelector("button").onclick = () =>
        eliminarUsuario(docu.id);

      tbody.appendChild(tr);
    });
  };

  //ELIMINAR USUARIO
  const eliminarUsuario = async (uid) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );
    if (!confirmar) return;

    await deleteDoc(doc(db, "usuarios", uid));
    alert("Usuario eliminado correctamente");
    cargarUsuarios();
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Admin | Nutrivida</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">

<style>
:root {
  --bank-dark: rgb(0, 21, 41);
  --bank-accent: #2ecc71;
}

body {
  background-color: #0b2e26;
  font-family: 'Segoe UI', sans-serif;
}

.admin-sidebar {
  background: var(--bank-dark);
  color: white;
  min-height: 100vh;
}

.nav-link {
  color: rgba(255,255,255,0.7);
  padding: 15px 20px;
  cursor: pointer;
}

.nav-link:hover, .nav-link.active {
  background: var(--bank-accent);
  color: white;
}

.admin-title {
  color: white;
}

.table-container {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>
</head>

<body>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-2 p-0 admin-sidebar">
      <div class="p-4 text-center border-bottom border-secondary">
        <h6 class="fw-bold">ADMIN PORTAL</h6>
      </div>

      <nav class="mt-3">
        <div class="nav-link active">
          <i class="bi bi-people me-2"></i> Gestión de Usuarios
        </div>

        <button
          id="btnSalir"
          class="nav-link mt-5 bg-transparent border-0 text-start w-100"
        >
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
              <th>UID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Objetivo</th>
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
