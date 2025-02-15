import { data_tareas } from "./data.js"; 
import { handleCheckbox } from "./checkbox.js"; 

function formulario() {
    let footer = document.createElement("footer");
    footer.className = "form_tareas";

    const tareas = data_tareas();

    tareas.forEach((tarea, index) => {
        let div = document.createElement("div");
        div.className = "div_tareas";

        div.innerHTML = `
            <input type="checkbox" id="tarea-${index + 1}">
            <label for="tarea-${index + 1}">${tarea}</label>
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

    form.appendChild(input);
    form.appendChild(button);
    div_contenedor.appendChild(form);

    return div_contenedor;
}

export { crearFormularioTarea, formulario };