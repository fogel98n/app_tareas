import { handleCheckbox } from "./checkbox.js";
async function obtenerTareas() {
    try {
        const response = await fetch('http://localhost:5000/tareas'); 
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return []; 
    }
}


async function formulario() {
    let footer = document.createElement("footer");
    footer.className = "form_tareas";

    const tareas = await obtenerTareas(); 

    
   
    
    tareas.forEach((tarea, index) => {
        let div = document.createElement("div");
        div.className = "div_tareas";

        div.innerHTML = `
            <input type="checkbox" id="tarea-${index + 12}">
            <label for="tarea-${index + 1}">${tarea.nombre}</label> <!-- Usé 'nombre' según el ejemplo de tu base de datos -->
        `;

        const checkbox = div.querySelector(`#tarea-${index + 1}`);
        const label = div.querySelector(`label[for="tarea-${index + 1}"]`);
       
        handleCheckbox(checkbox, label, div);
        footer.appendChild(div);
    });

    return footer;
}


function crearFormularioTarea() {
    let div_contenedor = document.createElement("div");
    div_contenedor.className = "contendor_form";

    let form = document.createElement("form");
    form.className = "form_crear_tarea";

    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nueva tarea";
    input.className = "input_tarea";

    let button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Agregar";
    button.className = "boton_agregar";

   
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const tareaNombre = input.value.trim();

        if (tareaNombre !== "") {
        
            await agregarTarea(tareaNombre, "Pendiente");

           
            const footer = await formulario();
            document.querySelector(".form_tareas").replaceWith(footer);

            input.value = ""; 
        }
    });

    form.appendChild(input);
    form.appendChild(button);
    div_contenedor.appendChild(form);

    return div_contenedor;
}


async function agregarTarea(nombre, estado) {
    try {
        const response = await fetch('http://localhost:5000/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, estado }),
        });

        if (!response.ok) {
            const errorDetails = await response.text(); 
            throw new Error(`Error al agregar la tarea: ${errorDetails}`);
        }

        const nuevaTarea = await response.json();
        return nuevaTarea;
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al agregar la tarea. Revisa la consola para más detalles.');
    }
}

export { crearFormularioTarea, formulario };
