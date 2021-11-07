%lex
%options case-insensitive
%%

\s+ //espacios

"//".* //comentarios

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  //comentario

"string"\b return 'string'
"double"\b return 'double'
"int"\b return 'int'
"boolean"\b return 'boolean'
"char"\b return 'char'
"void"\b return 'void'
"function"\b return 'function'
"return"\b return 'return'
"length"\b return 'length'
"if"\b return 'if'
"else"\b return 'else'
"true"\b return 'true'
"false"\b return 'false'
"break"\b return 'break'
"switch"\b return 'switch'
"case"\b return 'case'
"default"\b return 'default'
"continue"\b return 'continue'
"while"\b return 'while'
"do"\b return 'do'
"for"\b return 'for'
"new"\b return 'new'
"dynamiclist"\b return 'dynamiclist'
"append"\b return 'append'
"getvalue"\b return 'getvalue'
"setvalue"\b return 'setvalue'
"writeline"\b return 'writeline'
"tolower"\b return 'tolower'
"toupper"\b return 'toupper'
"length"\b return 'length'
"truncate"\b return 'truncate'
"round"\b return 'round'
"tostring"\b return 'tostring'
"typeof"\b return 'typeof'
"tochararray"\b return 'tochararray'
"start"\b return 'start'
"with"\b return 'with'
";" return 'punto_coma'
"," //peuba
":" return 'dos_puntos'
"{" return 'llave_izq'
"}" return 'llave_der'
"(" return 'par_izq'
")" return 'par_der'
"[" return 'cor_izq'
"]" return 'cor_der'
"++" return 'mas_mas'
"+" return 'mas'
"--" return 'menos_menos'
"-" return 'menos'
"^" return 'potencia'
"*" return 'por'
"/" return 'div'
"%" return 'mod'
"<=" return 'menor_igual'
">=" return 'mayor_igual'
">" return 'mayor'
"<" return 'menor'
"==" return 'igual_que'
"=" return 'igual'
"!=" return 'dif_que'
"&&" return 'and'
"||" return 'or'
"!" return 'not'
"?" return 'interrogacion'

\"[^\"]*\"			return 'cadena'
\'[^\']*\'			return 'char'
\`[^\`]*\`			return 'cadena'
[0-9]+("."[0-9]+)?\b  	return 'decimal'
[0-9]+\b 	return 'number'
([a-zA-Z])[a-zA-Z0-9_]* return 'id'

<<EOF>>				return 'EOF'
//Errores lexicos
.		{ errores_ast.push({'tipo':'lexico','error':yytext,'fila':yylloc.first_line,'column':yylloc.first_column})}
/lex

%left 'or'
%left 'and'
%right 'not'
%left 'igual_que' 'dif_que' 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'div' 'por'
%nonassoc 'potencia'
%right UMINUS

%start S

%%

//Definición de la Grámatica
S
  : INSTRUCCIONES EOF{
    return $1;
  }
;

INSTRUCCIONES
  : INSTRUCCIONES INSTRUCCION{
      $1.push($2);
      $$ = $1;
  }
  | INSTRUCCION{
    $$ = [$1];
  }               
;

INSTRUCCION
  : VARIABLE punto_coma{
    $$ = $1;
  }
  | VECTOR punto_coma{
    $$ = $1;
  }
  | LISTA punto_coma{
    $$ = $1;
  }
  | AGREGARLISTA punto_coma{
    $$ = $1;
  }
  | SENTIF{
    $$ = $1;
  }
  | MODIFLISTA punto_coma{
    $$ = $1;
  }
  | SENTSWITCH{
    $$ = $1;
  }
  | SENTWHILE{
    $$ = $1;
  }
  | SENTFOR{
    $$ = $1;
  }
  | SENTDOW punto_coma{
    $$ = $1;
  }
  | break punto_coma{
    $$ = {'label':'break'};
  }
  | continue punto_coma{
    $$ = {'label':'continue'};
  }
  | return EXP punto_coma{
    $$ = {'label':'return', 'valor':$2};
  }
  | return punto_coma{
    $$ = {'label':'return', 'valor':''};
  }
  | SENTFUN{
    $$ = $1;
  }
  | SETLLAMADA punto_coma{
    $$ = $1;
  }
  | SETWRITELINE punto_coma{
    $$ = $1;
  }
  | SETSTARTWITH punto_coma{
    $$ = $1;
  }
  | error { errores_ast.push({'tipo':'lexico','error':yytext,'fila':this._$.first_line,'column':this._$.first_column})}
;

VARIABLE
  : TIPODATO id{
    $$ = {'label':'variable','id':$2,'tipo':$1,'valor':null,'linea':@1.first_line,'columna':@1.first_column}
  }
  | TIPODATO LISTAID{
    $$ = {'label':'variable','id':$2,'tipo':$1,'valor':null,'linea':@1.first_line,'columna':@1.first_column}
  }
  | TIPODATO id igual EXP{
    $$ = {'label':'variable','id':$2,'tipo':$1,'valor':$4,'linea':@1.first_line,'columna':@1.first_column}
  }
  | TIPODATO LISTAID igual EXP{
    $$ = {'label':'variable','id':$2,'tipo':$1,'valor':$4,'linea':@1.first_line,'columna':@1.first_column}
  }
  | id igual EXP{
    $$ = {'label':'asignacionvariable','id':$1,'valor':$3,'linea':@1.first_line,'columna':@1.first_column}
  }
;

LISTAID
  : LISTAID id{
    $1.push($2)
    $$ = $1
  }
  | id{
    $$ = [$1]
  }
;

TIPODATO
  : int{
    $$ = 'int'
  }
  | string{
    $$ = 'string'
  }
  | char{
    $$ = 'char'
  }
  | double{
    $$ = 'double'
  }
  | boolean{
    $$ = 'boolean'
  }
  | void{
    $$ = 'void'
  }
  | dynamiclist menor TIPODATO mayor{
    $$ = 'lista'
  }
;

EXP
  : menos EXP %prec UMINUS {
    $$ = {'label':'negar','valor':$2,'signo':$1}
  }
  | not EXP
  {
    $$ = {'label':'negar','valor':$2,'signo':$1}
  }
  | EXP mas EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP menos EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP por EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP div EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP mod EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP potencia EXP{
    $$ = {'label':'aritmetica','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP igual_que EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP dif_que EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP mayor EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP mayor_igual EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP menor EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP menor_igual EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP or EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | EXP and EXP{
    $$ = {'label':'comparacion','valor1':$1,'signo':$2,'valor2':$3}
  }
  | par_izq EXP par_der{
    $$ = {'label':'compactacion','valor':$2}
  }
  | id menos_menos{
    $$ = {'label':'doblesigno','id':$1,'signo':$2}
  }
  | id mas_mas{
    $$ = {'label':'doblesigno','id':$1,'signo':$2}
  }
  | id{
    $$ = $1;
  }
  | number{
    $$ = $1;
  }
  | cadena{
    $$ = $1;
  }
  | char{
    $$ = $1;
  }
  | decimal{
    $$ = $1;
  }
  | true{
    $$ = $1;
  }
  | false{
    $$ = $1;
  }
  | TERNARIO{
    $$ = $1;
  }
  | CAST{
    $$ = $1;
  }
  | ACCESOVECTOR{
    $$ = $1;
  }
  | ACCESOLISTA{
    $$ = $1;
  }
  | SETLLAMADA{
    $$ = $1;
  }
  | SETTOCHARARRAY{
    $$ = $1;
  }
  | SETTOSTRING{
    $$ = $1;
  }
  | SETTYPEOF{
    $$ = $1;
  }
  | SETROUND{
    $$ = $1;
  }
  | SETTRUNCATE{
    $$ = $1;
  }
  | SETLENGTH{
    $$ = $1;
  }
  | SETTOUPPER{
    $$ = $1;
  }
  | SETTOLOWER{
    $$ = $1;
  }
;

TERNARIO
  : EXP interrogacion EXP dos_puntos EXP{
    $$ = {'label':'ternario','comparacion':$1,'verdadero':$3,'falso':$5}
  }
;

CAST
  : par_izq TIPODATO par_der EXP{
    $$ = {'label':'cast','tipo':$2,'valor':$4}
  }
;

VECTOR
  : TIPODATO id cor_izq cor_der igual new TIPODATO cor_izq EXP cor_der{
    $$ = {'label':'lista','id':$2,'tipo':$1,'valores':[],'linea':@1.first_line,'columna':@1.first_column}
  }
  | TIPODATO id cor_izq cor_der igual llave_izq LISTAVALORES llave_der{
    $$ = {'label':'lista','id':$2,'tipo':$1,'valores':$7,'linea':@1.first_line,'columna':@1.first_column}
  }
  | id cor_izq EXP cor_der igual EXP{
    $$ = {'label':'asignacionlista','id':$1,'indice':$3,'valor':$6}
  }
;

LISTAVALORES
  : LISTAVALORES EXP{
    $1.push($2)
    $$ = $1
  }
  | EXP{
    $$ = [$1]
  }
;

ACCESOVECTOR
  : id cor_izq EXP cor_der{
    $$ = {'label':'accesolista','id':$1,'indice':$3}
  }
;

LISTA
  : dynamiclist menor TIPODATO mayor id igual new dynamiclist menor TIPODATO mayor{
    $$ = {'label':'lista','id':$5,'tipo':$3,'valores':[],'linea':@1.first_line,'columna':@1.first_column}
  }
  | dynamiclist menor TIPODATO mayor id igual SETTOCHARARRAY{
    $$ = {'label':'lista','id':$5,'tipo':$3,'valores':$7,'linea':@1.first_line,'columna':@1.first_column}
  }
;

AGREGARLISTA
  : append par_izq id  EXP par_der{
    $$ = {'label':'agregarlista','id':$3,'valor':$4}
  }
;

ACCESOLISTA
  : getvalue par_izq id  EXP par_der{
    $$ = {'label':'accesolista','id':$3,'indice':$4}
  }
;

MODIFLISTA
  : setvalue par_izq id  EXP  EXP par_der{
    $$ = {'label':'asignacionlista','id':$3,'indice':$4,'valor':$5}
  }
;

SENTIF
  : if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der SENTELSE{
    $$ = {'label':'if','comparacion':$3,'instrucciones':$6,'else':$8}
  }
  | if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der else SENTIF{
    $$ = {'label':'if','comparacion':$3,'instrucciones':$6,'else':$9}
  }
  | if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'if','comparacion':$3,'instrucciones':$6,'else':''}
  }
;

SENTELSE
  : else llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'else','instrucciones':$3}
  }
;

SENTSWITCH
  : switch par_izq EXP par_der llave_izq LISTACASES llave_der{
    $$ = {'label':'switch','comparacion':$3,'cases':$6}
  }
;

LISTACASES
  : LISTACASES SENTCASES{
    $1.push($2)
    $$ = $1
  }
  | SENTDEFAULT{
    $$ = [$1]
  }
;

SENTCASES
  : case EXP dos_puntos INSTRUCCIONES{
    $$ = {'label':'case','comparacion':$2,'instrucciones':$4}
  }
;

SENTDEFAULT
  : default dos_puntos INSTRUCCIONES{
    $$ = {'label':'default','instrucciones':$3}
  }
;

SENTWHILE
  : while par_izq EXP par_der llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'while','comparacion':$3,'instrucciones':$6}
  }
;

SENTFOR
  : for par_izq VARIABLE punto_coma EXP punto_coma EXP par_der llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'for','variable':$3,'comparacion':$5,'iteracion':$7,'instrucciones':$10}
  }
;

SENTDOW
  : do llave_izq INSTRUCCIONES llave_der while par_izq EXP par_der{
    $$ = {'label':'dowhile','comparacion':$7,'instrucciones':$3}
  }
;

SENTFUN
  : TIPODATO id par_izq par_der llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'funcion','id':$2,'tipo':$1,'variables':'','instrucciones':$6,'linea':@1.first_line,'columna':@1.first_column}
  }
  | TIPODATO id par_izq LISTAPARAM par_der llave_izq INSTRUCCIONES llave_der{
    $$ = {'label':'funcion','id':$2,'tipo':$1,'variables':$4,'instrucciones':$7,'linea':@1.first_line,'columna':@1.first_column}
  }
;

LISTAPARAM
  : LISTAPARAM TIPODATO id {
    $1.push($3)
    $$ = $1
  }
  | TIPODATO id{
    $$= [$2]
  }
;

SETLLAMADA
  : id par_izq LISTAVALORES par_der{
    $$ = {'label':'llamada','metodo':$1,'valores':$3}
  }
  | id par_izq par_der{
    $$ = {'label':'llamada','metodo':$1,'valores':[]}
  }
;

SETWRITELINE
  : writeline par_izq EXP par_der{
    $$ = {'label':'writeline','valor':$3}
  }
;

SETTOLOWER
  : tolower par_izq EXP par_der{
    $$ = {'label':'tolower','valor':$3}
  }
;

SETTOUPPER
  : toupper par_izq EXP par_der{
    $$ = {'label':'toupper','valor':$3}
  }
;

SETLENGTH
  : length par_izq EXP par_der{
    $$ = {'label':'length','valor':$3}
  }
;

SETTRUNCATE
  : truncate par_izq EXP par_der{
    $$ = {'label':'truncate','valor':$3}
  }
;

SETROUND
  : round par_izq EXP par_der{
    $$ = {'label':'round','valor':$3}
  }
;

SETTYPEOF
  : typeof par_izq EXP par_der{
    $$ = {'label':'typeof','valor':$3}
  }
;

SETTOSTRING
  : tostring par_izq EXP par_der{
    $$ = {'label':'tostring','valor':$3}
  }
;

SETTOCHARARRAY
  : tochararray par_izq EXP par_der{
    $$ = {'label':'toarray','valor':$3}
  }
;

SETSTARTWITH
  : start with SETLLAMADA {
    $$ = {'label':'inicio','valor':$3}
  }
;
