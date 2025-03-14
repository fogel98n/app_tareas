function crearFormularioLogin(cargarContenidoPrincipal) {
    let contenedorLogin = document.createElement("section");
    contenedorLogin.className = "login-container";

    // Crear el formulario de login
    let formularioLogin = document.createElement("form");
    formularioLogin.id = "login-form";

    let grupoUsuario = document.createElement("div");
    grupoUsuario.className = "input-group";

    let labelUsuario = document.createElement("label");
    labelUsuario.htmlFor = "username";
    labelUsuario.textContent = "Usuario";

    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.id = "username";
    inputUsuario.name = "username";
    inputUsuario.required = true;

    grupoUsuario.appendChild(labelUsuario);
    grupoUsuario.appendChild(inputUsuario);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "password";
    labelContraseña.textContent = "Contraseña";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "password";
    inputContraseña.name = "password";
    inputContraseña.required = true;

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = "Ingresar";

    let botonRegistro = document.createElement("button");
    botonRegistro.type = "button";
    botonRegistro.textContent = "Registrarse";
    botonRegistro.addEventListener("click", () => {
        // Cambiar al formulario de registro
        contenedorLogin.innerHTML = '';
        contenedorLogin.appendChild(crearFormularioRegistro(cargarContenidoPrincipal));
    });

    formularioLogin.appendChild(grupoUsuario);
    formularioLogin.appendChild(grupoContraseña);
    formularioLogin.appendChild(botonEnvio);
    formularioLogin.appendChild(botonRegistro);

    formularioLogin.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const username = inputUsuario.value.trim();  // Eliminar espacios extra
        const password = inputContraseña.value.trim();  // Eliminar espacios extra

        if (!username || !password) {
            alert("Por favor ingresa un nombre de usuario y una contraseña.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                cargarContenidoPrincipal(); // Llamar a la función para cargar el contenido principal
            } else {
                alert(data.error || "Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
            alert("Hubo un problema al intentar iniciar sesión. Inténtalo más tarde.");
        }
    });

    contenedorLogin.appendChild(formularioLogin);
    return contenedorLogin;
}

function crearFormularioRegistro(cargarContenidoPrincipal) {
    let contenedorRegistro = document.createElement("section");
    contenedorRegistro.className = "login-container";

    let formularioRegistro = document.createElement("form");
    formularioRegistro.id = "register-form";

    let grupoUsuario = document.createElement("div");
    grupoUsuario.className = "input-group";

    let labelUsuario = document.createElement("label");
    labelUsuario.htmlFor = "username";
    labelUsuario.textContent = "Usuario";

    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.id = "username";
    inputUsuario.name = "username";
    inputUsuario.required = true;

    grupoUsuario.appendChild(labelUsuario);
    grupoUsuario.appendChild(inputUsuario);

    let grupoCorreo = document.createElement("div");
    grupoCorreo.className = "input-group";

    let labelCorreo = document.createElement("label");
    labelCorreo.htmlFor = "email";
    labelCorreo.textContent = "Correo";

    let inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.id = "email";
    inputCorreo.name = "email";
    inputCorreo.required = true;

    grupoCorreo.appendChild(labelCorreo);
    grupoCorreo.appendChild(inputCorreo);

    let grupoContraseña = document.createElement("div");
    grupoContraseña.className = "input-group";

    let labelContraseña = document.createElement("label");
    labelContraseña.htmlFor = "password";
    labelContraseña.textContent = "Contraseña";

    let inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "password";
    inputContraseña.name = "password";
    inputContraseña.required = true;

    grupoContraseña.appendChild(labelContraseña);
    grupoContraseña.appendChild(inputContraseña);

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = "Registrarse";

    formularioRegistro.appendChild(grupoUsuario);
    formularioRegistro.appendChild(grupoCorreo);
    formularioRegistro.appendChild(grupoContraseña);
    formularioRegistro.appendChild(botonEnvio);

    formularioRegistro.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const username = inputUsuario.value.trim();
        const email = inputCorreo.value.trim();
        const password = inputContraseña.value.trim();

        if (!username || !email || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario registrado correctamente');
                // Volver al formulario de login
                contenedorRegistro.innerHTML = '';
                contenedorRegistro.appendChild(crearFormularioLogin(cargarContenidoPrincipal));
            } else {
                alert(data.error || "Hubo un problema al registrar el usuario.");
            }
        } catch (error) {
            console.error("Error en la solicitud de registro:", error);
            alert("Hubo un problema al intentar registrarte. Inténtalo más tarde.");
        }
    });

    contenedorRegistro.appendChild(formularioRegistro);
    return contenedorRegistro;
}

export { crearFormularioLogin };
