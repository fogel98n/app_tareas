import { crearHeader } from "./components/header/header.js"
import { formulario } from "./components/formulario/form.js"
import { tarea } from "./components/tareas/tareas.js"
let DOM =document.getElementById("root")

DOM.appendChild(crearHeader())
DOM.appendChild(tarea())
DOM.appendChild(formulario())