console.log("Módulo cargado: Perfiles");

// Selecciona el contenedor principal donde se muestra el contenido
const app = document.getElementById("app");

// Limpia el contenido anterior
app.innerHTML = "";

// Inserta contenido del módulo
app.innerHTML = `
    <h2>Perfiles</h2>

    <div class="perfil-form">
        <label>Nombre:</label>
        <input type="text" id="nombre" placeholder="Ingresa nombre">

        <label>Email:</label>
        <input type="email" id="email" placeholder="Ingresa email">

        <label>Tipo de Perfil:</label>
        <select id="tipo">
            <option value="cliente">Cliente</option>
            <option value="guy">Guy</option>
            <option value="guyplus">Guy Plus</option>
        </select>

        <button id="guardarPerfil">Guardar Perfil</button>
    </div>
`;

// Acción del botón
document.getElementById("guardarPerfil").onclick = () => {
    console.log("Perfil guardado (simulado)");
    alert("Perfil guardado (simulado)");
};

