import { crearHeader } from "./components/header/header.js";
import { formulario, crearFormularioTarea } from "./components/formulario/form.js";
import { tarea } from "./components/tareas/tareas.js";


async function cargarDOM() {
let DOM = document.getElementById("root");
    DOM.appendChild(crearHeader()); 
    DOM.appendChild(await formulario()); 
DOM.appendChild(crearFormularioTarea()); 
}


cargarDOM();
