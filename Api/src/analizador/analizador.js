import * as analis from './archivo_salida'
let simbolos = []
export let salida_toca;
export let astsalida;
// variables
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const run = async(texto) => {
    const prueba = require('./gramatica')
    let ast = prueba.parse(texto)
    let errores = prueba.errores
    let texto_salida = executeInstrucciones(ast, 0)
    const fs = require('fs')
    let texto_archivo =`
    export let texto_salida=[];
    try{
        ${texto_salida}
    }catch(error){
        console.log(error);
    }
    `
    fs.writeFile('/home/ferand20/Escritorio/SYSCOMPILER/Api/src/analizador/archivo_salida.js',texto_archivo, err => {
        if (err) {
            console.error(err)
            return
        }
    })
    let textoq = analis.texto_salida
    astsalida=ast
    salida_toca = { 'salida':textoq, 'errores': errores, 'simbolos': simbolos, 'ast': ast }
}
// metodos
const executeInstrucciones = (inst, entorno) => {
    let textoAux = ''
    inst.forEach(i => {
        if (i.label == 'variable') {
            textoAux += executeVariable(i, entorno)
        }
        if (i.label == 'asignacionvariable') {
            textoAux += executeAsigVar(i)
        }
        if (i.label == 'lista') {
            textoAux += executeVector(i, entorno)
        }
        if (i.label == 'agregarlista') {
            textoAux += executeAgreLista(i)
        }
        if (i.label == 'if') {
            textoAux += executeIf(i, entorno)
        }
        if (i.label == 'asignacionlista') {
            textoAux += executeAsigList(i)
        }
        if (i.label == 'switch') {
            textoAux += executeSwitch(i, entorno)
        }
        if (i.label == 'while') {
            textoAux += executeWhile(i, entorno)
        }
        if (i.label == 'for') {
            textoAux += executeFor(i, entorno)
        }
        if (i.label == 'dowhile') {
            textoAux += executeDOW(i, entorno)
        }
        if (i.label == 'funcion') {
            textoAux += executeFuncion(i, entorno)
        }
        if (i.label == 'break') {
            textoAux += "\nbreak;\n"
        }
        if (i.label == 'continue') {
            textoAux += '\ncontinue;\n'
        }
        if (i.label == 'return') {
            textoAux += `\nreturn ${executeEXP(i.valor)}`
        }
        if (i.label == 'llamada') {
            textoAux += executellamada(i)
        }
        if (i.label == 'writeline') {
            textoAux += executewrite(i)
        }
        if (i.label == 'inicio') {
            textoAux += executeinicio(i)
        }
    })
    return textoAux
}

const executeEXP = (exp) => {
    if ((typeof exp) == 'object') {
        if (exp.label == 'negar') {
            return `${exp.signo}${executeEXP(exp.valor)}`
        }
        if (exp.label == 'aritmetica') {
            return `${executeEXP(exp.valor1)}${exp.signo}${executeEXP(exp.valor2)}`
        }
        if (exp.label == 'comparacion') {
            return `${executeEXP(exp.valor1)}${exp.signo}${executeEXP(exp.valor2)}`
        }
        if (exp.label == 'doblesigno') {
            return `${exp.id}${exp.signo}`
        }
        if (exp.label == 'compactacion') {
            return `(${executeEXP(exp.valor)})`
        }
        if (exp.label == 'llamada') {
            return `${executellamada(exp)}`
        }
        if (exp.label == 'ternario') {
            return `${executeTernario(exp)}`
        }
        if (exp.label == 'cast') {
            return `${executeCast(exp)}`
        }
        if (exp.label == 'accesolista') {
            return `${executeAccVec(exp)}`
        }
        if (exp.label == 'tolower') {
            return `${executelower(exp)}`
        }
        if (exp.label == 'toupper') {
            return `${executeupper(exp)}`
        }
        if (exp.label == 'length') {
            return `${executelength(exp)}`
        }
        if (exp.label == 'truncate') {
            return `${executetruncate(exp)}`
        }
        if (exp.label == 'round') {
            return `${executeround(exp)}`
        }
        if (exp.label == 'typeof') {
            return `${executetype(exp)}`
        }
        if (exp.label == 'toarray') {
            return `${executearray(exp)}`
        }
        if (exp.label == 'tostring') {
            return `${executetostring(exp)}`
        }
    } else {
        return `${exp}`
    }
}

const executeVariable = (variable, entorno) => {
    let textoAux = ''
    if ((typeof variable.id) == 'string') {
        simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    } else {
        variable.id.forEach((id) => {
            simbolos.push({ 'id': id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
        })
    }
    if ((variable.tipo == 'int' || variable.tipo == 'double') && variable.valor == null) {
        if ((typeof variable.id) == 'string') {
            textoAux += `\nlet ${variable.id} = ${0} \n`
        } else {
            variable.id.forEach((id) => {
                textoAux += `\nlet ${id} = ${0}} \n`
            })
        }
    } else if ((variable.tipo == 'string' || variable.tipo == 'char') && variable.valor == '') {
        if ((typeof variable.id) == 'string') {
            textoAux += `\nlet ${variable.id} = \"\"; \n`
        } else {
            variable.id.forEach((id) => {
                textoAux += `\nlet ${id} = \"\" \n`
            })
        }
    } else if (variable.tipo == 'boolean' && variable.valor == '') {
        if ((typeof variable.id) == 'string') {
            textoAux += `\nlet ${variable.id} = false \n`
        } else {
            variable.id.forEach((id) => {
                textoAux += `\nlet ${id} = false \n`
            })
        }
    } else {
        let valorv=executeEXP(variable.valor)
        if(valorv===undefined){
            valorv='[]'
        }
        if ((typeof variable.id) == 'string') {
            textoAux += `\nlet ${variable.id} =${valorv} \n`
        } else {
            variable.id.forEach((id) => {
                textoAux += `\nlet ${id} = ${valorv} \n`
            })
        }
    }
    return textoAux;
}
const executeAsigVar = (variable) => {
    return `${variable.id} = ${executeEXP(variable.valor)}; \n`
}
const executeTernario = (ternario) => {
    return `${executeEXP(ternario.comparacion)}?${executeEXP(ternario.verdadero)}:${executeEXP(ternario.falso)}`
}
const executeCast = (cast) => {
    if (cast.tipo == 'int' || cast.tipo == 'double') {
        return `Number(${executeEXP(cast.valor)})`
    }
    if (cast.tipo == 'string' || cast.tipo == 'char') {
        return `String(${executeEXP(cast.valor)})`
    }
}
const executeVector = (variable, entorno) => {
    simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    let valorh=executeEXP(variable.valores)
    if(valorh==undefined){
        valorh='[]'
    }
    return `let ${variable.id} = ${valorh}; \n`
}
const executeAccVec = (variable) => {
    return `${variable.id}[${executeEXP(variable.indice)}]`
}
const executeAgreLista = (variable) => {
    return `${variable.id}.push(${executeEXP(variable.valor)}); \n`
}
const executeAsigList = (variable) => {
    return `${variable.id}[${executeEXP(variable.indice)}] = ${executeEXP(variable.valor)}; \n`
}
const executeIf = (variable, entorno) => {
    let auxelse = '';
    if (variable.else) {
        auxelse = executeElse(variable.else, entorno)
    }
    return `if(${executeEXP(variable.comparacion)}){\n${executeInstrucciones(variable.instrucciones, entorno++)}}else{${auxelse}\n} \n`
}
const executeElse = (variable, entorno) => {
    return `\n ${executeInstrucciones(variable.instrucciones, entorno++)}\n`
}
const executeCases = (variable, entorno) => {
    return `\n case ${executeEXP(variable.comparacion)}: \n${executeInstrucciones(variable.instrucciones, entorno++)}\n`
}
const executeSwitch = (variable, entorno) => {
    let textoAux = ''
    variable.forEach(cas => {
        textoAux += executeCases(cas, entorno++)
    })
    return `switch(${executeEXP(variable.comparacion)})){\n ${textoAux}\n}\n`
}
const executeWhile = (variable, entorno) => {
    return `while(${executeEXP(variable.comparacion)}){\n ${executeInstrucciones(variable.instrucciones, entorno++)}\n}\n`
}
const executeDOW = (variable, entorno) => {
    return `do{\n${executeInstrucciones(variable.instrucciones, entorno++)}\n}while(${executeEXP(variable.comparacion)})\n`
}
const executeFor = (variable, entorno) => {
    return `for(${executeVariable(variable.variable, entorno)};${executeEXP(variable.comparacion)};${executeEXP(variable.iteracion)}){\n${executeInstrucciones(variable.instrucciones, entorno++)}\n}\n`
}
const executeFuncion = (variable, entorno) => {
    simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    return `\nfunction ${variable.id}(${variable.variables}){\n${executeInstrucciones(variable.instrucciones, entorno++)}\n} \n`
}
const executellamada = (variable) => {
    let auxtext = '';
    variable.valores.forEach(v => {
        auxtext += executeEXP(v) + ','
    })
    auxtext = auxtext.substring(0, auxtext.length - 1)
    return `\n${variable.metodo}(${auxtext})`
}
const executewrite = (variable) => {
    return `\ntexto_salida.push(${executeEXP(variable.valor)})\n`
}
const executelower = (variable) => {
    return `${executeEXP(variable.valor)}.toLowerCase()`
}
const executeupper = (variable) => {
    return `${executeEXP(variable.valor)}.toUpperCase()`
}
const executelength = (variable) => {
    return `${executeEXP(variable.valor)}.length`
}
const executetruncate = (variable) => {
    return `Math.trunc(${executeEXP(variable.valor)})`
}
const executeround = (variable) => {
    return `Math.round(${executeEXP(variable.valor)})`
}
const executetype = (variable) => {
    return `typeof ${executeEXP(variable.valor)}`
}
const executetostring = (variable) => {
    return `${executeEXP(variable.valor)}.toString()`
}
const executearray = (variable) => {
    return `Array.from(${executeEXP(variable.valor)})`
}
const executeinicio = (variable) => {
    return `${executellamada(variable.valor)}`
}