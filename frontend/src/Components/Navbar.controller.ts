import axios from "axios";

let numero = 1;
export const creartextarea = () => {
    numero++;
    const constenedorbutton = document.getElementById("buttonstextareas");
    const newbutton = document.createElement("li");
    newbutton.className = "nav-item";
    const newlink = document.createElement("a");
    newlink.className = "nav-link";
    newlink.setAttribute("href", `#tab${numero}`);
    newlink.setAttribute("data-bs-toggle", "tab");
    newlink.innerHTML = `tab${numero}`;
    newbutton.appendChild(newlink);
    constenedorbutton?.appendChild(newbutton);
    const contenedortextareas = document.getElementById("textareas");
    const newdivtext = document.createElement("div");
    newdivtext.className = "tab-pane fade";
    newdivtext.id = `tab${numero}`;
    const newtextarea = document.createElement("textarea");
    newtextarea.className = "numerado";
    newdivtext.appendChild(newtextarea);
    contenedortextareas?.appendChild(newdivtext);
};
export const eliminartextarea = () => {
    const constenedorbutton = document.getElementById("buttonstextareas");
    const contenedortextareas = document.getElementById("textareas");
    if (constenedorbutton?.hasChildNodes()) {
        const children = constenedorbutton.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (constenedorbutton.children[i].children[0].className.includes('active')) {
                constenedorbutton.removeChild(constenedorbutton.children[i])
                contenedortextareas?.removeChild(contenedortextareas?.children[i])
            }
        }
    }
};

export const ejecutar = async () => {
    const objeto = {'entrada':getTextOFTextArea()}
    await axios.post('http://localhost:5000/entrada',objeto)
    const getSalida= await axios.get('http://localhost:5000/salida')
    const errores = getSalida.data.errores;
    const simbolos = getSalida.data.simbolos;
    console.log(getSalida.data.ast)
    setConsola(getSalida.data.salida);
    const tablaerrores = document.getElementById('contenidoErrores')
    while (tablaerrores?.firstChild) {
        tablaerrores.removeChild(tablaerrores.lastChild as any);
    }
    let iterarerror=0;
    for(let p of errores){
        iterarerror++;
        const tupla = document.createElement('tr')
        tupla.className="table-primary"
        tupla.innerHTML=`<td>${iterarerror}</td>
        <td>${p.tipo}</td>
        <td>${p.error}</td>
        <td>${p.fila}</td>
        <td>${p.column}</td>`
        tablaerrores?.appendChild(tupla)
    }
    const tablaSimbolos = document.getElementById('contenidoSimbolos')
    while (tablaSimbolos?.firstChild) {
        tablaSimbolos.removeChild(tablaSimbolos.lastChild as any);
    }
    let iterarsimbolos = 0;
    for(let p of simbolos){
        iterarsimbolos++;
        const tupla = document.createElement('tr')
        tupla.className="table-primary"
        tupla.innerHTML=`<td>${iterarsimbolos}</td>
        <td>${p.id}</td>
        <td>${p.tipoS}</td>
        <td>${p.tipo}</td>
        <td>${p.entorno}</td>
        <td>${p.fila}</td>
        <td>${p.columna}</td>`
        tablaSimbolos?.appendChild(tupla)
    }
}

const setConsola = (texto: string) => {
    const consola = document.getElementById('consola')
    const textConsola: HTMLTextAreaElement = consola?.children[0] as HTMLTextAreaElement
    textConsola.value = texto
}

const getTextOFTextArea = () => {
    const contenedortextareas = document.getElementById("textareas");
    if (contenedortextareas?.hasChildNodes()) {
        const children = contenedortextareas.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (contenedortextareas.children[i].className.includes('active')) {
                const c: HTMLTextAreaElement = contenedortextareas.children[i].children[0] as HTMLTextAreaElement
                return c.value as string
            }
        }
    }
};

export const crearArchivo = () => {
    const name = prompt("Nombre del archivo");
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(getTextOFTextArea() as string));
    element.setAttribute('download', `${name}.sc`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export const abrirArchivo = async () => {
    const archivero = document.getElementById('files') as any
    archivero?.click();
    await archivero.addEventListener('change', leerArchivo, false);
    archivero.value = ''

}

const leerArchivo = (e: any) => {
    const archivo = e.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (e) {
            const contenido = e.target?.result;
            setTextOFTextArea(contenido as string);
        };
        lector.readAsText(archivo);
    }

}

const setTextOFTextArea = (texto: string) => {
    const contenedortextareas = document.getElementById("textareas");
    if (contenedortextareas?.hasChildNodes()) {
        const children = contenedortextareas.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (contenedortextareas.children[i].className.includes('active')) {
                const c: HTMLTextAreaElement = contenedortextareas.children[i].children[0] as HTMLTextAreaElement
                c.value = texto;
            }
        }
    }
};




