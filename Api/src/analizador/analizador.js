let texto = `
void metodo1(){
    //llamada del metodo
    figura1(10);
}
void figura1(int n) {
        String cadenaFigura = "";
        double i; 
        i=-3*n/2;
        //iniciando dibujo
        while(i<=n){
            cadenaFigura = "";
            double j; 
            j=-3*n/2;
            while(j<=3*n){
                double absolutoi;
                absolutoi = i;
                double absolutoj;
                absolutoj = j;
                if(i < 0)
                {
                    absolutoi = i * -1;
                }
                if(j < 0)
                {
                    absolutoj = j * -1;
                }
                if((absolutoi + absolutoj < n)
                        || ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
                        || ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
                    cadenaFigura = cadenaFigura + "* ";
                }
                else
                {
                    cadenaFigura = cadenaFigura + ". ";
                }
                j=j+1;
            }
            WriteLine(cadenaFigura);
            i=i+1;
        }
        WriteLine("Si la figura es un corazón, te aseguro que tendrás un 100 :3");
    }

StarT WItH metodo1();
`
let texto2 = `//2do Archivo de Prueba

double r_toRadians;
double r_sine;
void toRadians(double angle) {
    r_toRadians = angle * 3.141592653589793 / 180;
}

void sine(double x) {
    double sin = 0.0;
    int fact;
    int i = 1;
    while (i <= 10) {
        fact = 1;
        int j = 1;
        while (j <= 2 * i - 1) {
            fact = fact * j;
            j = j + 1;
        }
        sin = sin + ((x^(2*i-1)) / fact);
        i = i + 1;
    }
    r_sine = sin;
}

void drawTree(double x1, double y1, double angle, int depth) {
    if (depth != 0) {
        toRadians(angle);
        sine(3.141592653589793 / 2 + r_toRadians);
        double x2 = x1 + (r_sine * depth * 10.0);
        toRadians(angle);
        sine(r_toRadians);
        double y2 = y1 + (r_sine * depth * 10.0);
        WriteLine(x1 + " " + y1 + " " + x2 + " " + y2 + "");
        drawTree(x2, y2, angle - 20, depth - 1);
        drawTree(x2, y2, angle + 20, depth - 1);
    }

}

void Principal() {
    WriteLine("===============¿SI SALE?=================");
    drawTree(250.0, 500.0, -90.0, 4);
    WriteLine("================ FIN ====================");
}

Start With Principal();

/*
-------------------------SALIDAD ESPERADA----------------------
===============¿SI SALE?=================
250 500 250 407.9480439077082
250 407.9480439077082 239.31406202799965 307.8471746908033
239.31406202799965 307.8471746908033 224.18926216484266 212.19110133437974
224.18926216484266 212.19110133437974 211.6955916596029 144.01486829323312
224.18926216484266 212.19110133437974 220.62728284084255 178.82414492874477
239.31406202799965 307.8471746908033 239.31406202799965 261.8211966446574
239.31406202799965 261.8211966446574 235.75208270399955 228.45424023902243
239.31406202799965 261.8211966446574 242.87604135199976 246.32952396143438
250 407.9480439077082 260.6859379720004 361.47302585803914
260.6859379720004 361.47302585803914 260.6859379720004 315.44704781189324
260.6859379720004 315.44704781189324 257.12395864800027 282.08009140625825
260.6859379720004 315.44704781189324 264.2479172960005 299.9553751286702
260.6859379720004 361.47302585803914 275.81073783515734 341.71859712289154
275.81073783515734 341.71859712289154 279.37271715915745 326.2269244396685
275.81073783515734 341.71859712289154 288.3044083403971 336.24006238401114
================ FIN ====================
*/
`
let texto3 = `
void funcionesEspecialesYNativas(){
    int a = 15;
    writeline("------------------TOLOWER-------------------");
    writeline("SIN TOLOWER");
    writeline(toLower("CON TOLOWER"));
    writeline("------------------TOUPPER-------------------");
    writeline("sin toupper");
    writeline(toUpper("con toupper"));
    writeline("------------------TRUNCATE------------------");
    double b=17.8;
    writeline("sin truncate: "+b);
    b=truncate(b);
    writeline("con truncate "+b);
    writeline("------------------ROUND-------------------");
    double c=26.5;
    writeline("sin round: "+c);
    c=round(c);
    writeline("con round "+c);
    double cc=26.4;
    writeline("sin round: "+cc);
    cc=round(cc);
    writeline("con round "+cc);
    writeline("-----------------TYPEOF--------------------");
    string x="soy una cadena";
    int y = 50;
    double z = 78.5;
    char xx = 'a';
    boolean yy = true;
    writeline("tipo: "+typeof(x));
    writeline("tipo: "+typeof(y));
    writeline("tipo: "+typeof(z));
    writeline("tipo: "+typeof(xx));
    writeline("tipo: "+typeof(yy));
    writeline("------------------LENGTH-------------------");
    string cadena="soy una cadena";
    writeline("tamaño: "+length(cadena));
    writeline("------------------TOSTRING-------------------");
    int numero=105;
    writeline("tipo: "+typeof(numero));
    writeline("tipo: "+typeof(toString(numero)));
    writeline("----------------TOCHARARRAY------------------");
    dynamiclist<char> listaChar = toCharArray("SOY UNA LISTA");
    writeline("########imprimiendo lista de caracteres#######");
    imprimirListaChar(listaChar);
}

start with funcionesEspecialesYNativas();

void imprimirListaChar(dynamiclist<char> miLista){
    for (int i = 0; i < length(miLista); i++) {
        writeLine("listaChar[[" + i + "]] = " + getValue(miLista,i));
    }
}

/*
--------------------SALIDA ESPERADA-----------------
------------------TOLOWER-------------------
SIN TOLOWER
con tolower
------------------TOUPPER-------------------
sin toupper
CON TOUPPER
------------------TRUNCATE------------------
sin truncate: 17.8
con truncate 17
------------------ROUND-------------------
sin round: 26.5
con round 27
sin round: 26.4
con round 26
-----------------TYPEOF--------------------
tipo: STRING
tipo: INT
tipo: DOUBLE
tipo: CHAR
tipo: BOOLEAN
------------------LENGTH-------------------
tamaño: 14
------------------TOSTRING-------------------
tipo: INT
tipo: STRING
----------------TOCHARARRAY------------------
########imprimiendo lista de caracteres#######
listaChar[[0]] = S
listaChar[[1]] = O
listaChar[[2]] = Y
listaChar[[3]] =  
listaChar[[4]] = U
listaChar[[5]] = N
listaChar[[6]] = A
listaChar[[7]] =  
listaChar[[8]] = L
listaChar[[9]] = I
listaChar[[10]] = S
listaChar[[11]] = T
listaChar[[12]] = A
*/
`
let texto4 = `
void Principal(){
    WriteLine("-----------Factorial Iterativo---------");
    WriteLine("8! = " + factorialIterativo(8));
    WriteLine("-----------Factorial Recursivo---------");
    WriteLine("8! = " + factorialRecursivo(8));
}

int factorialIterativo(int n){
    int resultado = 1;
    for (int i = 1; i <= n; i++) {
        resultado = resultado * i;
    }
    return resultado;
}

int factorialRecursivo(int n) {
    if (n == 0) {
        return 1;
    }
    return (n * factorialRecursivo(n - 1));
}

start With Principal();

/*
--------------------SALIDA ESPERADA-----------------
-----------Factorial Iterativo---------
8! = 40320
-----------Factorial Recursivo---------
8! = 40320
*/
`
// variables
const prueba = require('./gramatica')
let ast = prueba.parse(texto4)
let errores = prueba.errores
let simbolos = []
let texto_salida_archivo = ''
// metodos
const executeVariable = (variable, entorno) => {
    if ((typeof variable.id) == 'string') {
        simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    } else {
        variable.id.forEach((id) => {
            simbolos.push({ 'id': id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
        })
    }
    if ((variable.tipo == 'int' || variable.tipo == 'double') && variable.valor == null) {
        if ((typeof variable.id) == 'string') {
            texto_salida_archivo += `let ${variable.id} = ${0}; \n`
        } else {
            variable.id.forEach((id) => {
                texto_salida_archivo += `let ${id} = ${0}}; \n`
            })
        }
    } else if ((variable.tipo == 'string' || variable.tipo == 'char') && variable.valor == null) {
        if ((typeof variable.id) == 'string') {
            texto_salida_archivo += `let ${variable.id} = \"\"; \n`
        } else {
            variable.id.forEach((id) => {
                texto_salida_archivo += `let ${id} = \"\"; \n`
            })
        }
    } else if (variable.tipo == 'boolean' && variable.valor == null) {
        if ((typeof variable.id) == 'string') {
            texto_salida_archivo += `let ${variable.id} = false; \n`
        } else {
            variable.id.forEach((id) => {
                texto_salida_archivo += `let ${id} = false; \n`
            })
        }
    } else {
        if ((typeof variable.id) == 'string') {
            texto_salida_archivo += `let ${variable.id} = ${variable.valor}; \n`
        } else {
            variable.id.forEach((id) => {
                texto_salida_archivo += `let ${id} = ${variable.valor}; \n`
            })
        }
    }
}
const executeAsigVar = (variable) =>{
    texto_salida_archivo += `${variable.id} = ${variable.valor}; \n`
}
const executeTernario = (ternario) =>{
    return `${ternario.comparacion}?${ternario.verdadero}:${ternario.falso}`
}
const executeCast = (cast) =>{
    if(cast.tipo=='int'||cast.tipo=='double'){
        return `Number(${cast.valor})`
    }
    if(cast.tipo=='string'||cast.tipo=='char'){
        return `String(${cast.valor})`
    }
}
const executeVector = (variable, entorno) => {
    simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    texto_salida_archivo += `let ${variable.id} = ${variable.valores}; \n`
}
const executeAsigVec = (variable) =>{
    texto_salida_archivo += `${variable.id}[${variable.indice}] = ${variable.valor}; \n`
}
const executeAccVec = (variable) =>{
    return `${variable.id}[${variable.indice}]`
}
const executeLista = (variable, entorno) => {
    simbolos.push({ 'id': variable.id, 'tipoS': variable.label, 'tipo': variable.tipo, 'entorno': entorno, 'fila': variable.linea, 'columna': variable.columna })
    texto_salida_archivo += `let ${variable.id} = ${variable.valores}; \n`
}
const executeAgreLista = (variable) =>{
    texto_salida_archivo += `${variable.id}.push(${variable.valor}); \n`
}
const executeAccList = (variable) =>{
    return `${variable.id}[${variable.indice}]`
}
const executeAsigList = (variable) =>{
    texto_salida_archivo += `${variable.id}[${variable.indice}] = ${variable.valor}; \n`
}
const executeIf = (variable) =>{
    texto_salida_archivo += `if(${variable.comparacion}){${variable.instrucciones}}else{${variable.else}} \n`
}
const executeElse = (variable) =>{
    return `${variable.instrucciones}`
}
const executeSwitch = (variable) =>{

}
// ejecucion
console.log(errores)
console.log(simbolos)
console.log(texto_salida_archivo)
console.log(JSON.stringify(ast))