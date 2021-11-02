%lex

%options case-insensitive

%%

\s+											           
"//".*										             
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

'string' return 'string';
'double' return 'double';
'int' return 'int';
'boolean' return 'boolean';
'char' return 'char';
//'type' return 'type';
'function' return 'function';
'return' return 'return';
'length' return 'length';
'if' return 'if';
'else' return 'else';
'true' return 'true';
'false' return 'false';
'break' return 'break';
'switch' return 'switch';
'case' return 'case';
'default' return 'default';
'continue' return 'continue';
'while' return 'while';
'do' return 'do';
'for' return 'for';
'new' return 'new';
'dynamiclist' return 'DynamicList';
'append' return 'append'
'getvalue' return 'getvalue'
'setvalue' return 'setvalue'

//Signos
';' return 'punto_coma';
',' return 'coma';
':' return 'dos_puntos';
'{' return 'llave_izq';
'}' return 'llave_der';
'(' return 'par_izq';
')' return 'par_der';
'[' return 'cor_izq';
']' return 'cor_der';
'.' return 'punto';
'++' return 'mas_mas'
'+' return 'mas';
'--' return 'menos_menos'
'-' return 'menos';
'**' return 'potencia';
'*' return 'por';
'/' return 'div';
'%' return 'mod';
'<=' return 'menor_igual';
'>=' return 'mayor_igual';
'>' return 'mayor';
'<' return 'menor';
'==' return 'igual_que';
'=' return 'igual';
'!=' return 'dif_que';
'&&' return 'and';
'||' return 'or';
'!' return 'not';
'?' return 'interrogacion';

\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
\'[^\']*\'			{ yytext = yytext.substr(0,yyleng-0); return 'char'; }
\`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
[0-9]+\b  	return 'number';
[0-9]+("."[0-9]+)?\b  	return 'decimal';
([a-zA-Z])[a-zA-Z0-9_]* return 'id';

//Fin del archivo
<<EOF>>				return 'EOF';
//Errores lexicos
.		{
  
  }
/lex

%{
  
%}

%left 'or'
%left 'and'
%right 'not'
%left 'igual_que' 'dif_que' 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'div' 'por'
%nonassoc 'potencia'
%right 'menos'

%start S

%%

//Definición de la Grámatica
S
  : INSTRUCCIONES EOF {  }
;

INSTRUCCIONES
  : INSTRUCCIONES INSTRUCCION  {  }
  | INSTRUCCION                {  }
;

INSTRUCCION
  : VARIABLE punto_coma
  | VECTOR punto_coma
  | LISTA punto_coma
  | AGREGARLISTA punto_coma
  | SENTIF
  | MODIFLISTA punto_coma
  | SENTSWITCH
  | SENTWHILE
  | SENTFOR
  | SENTDOW punto_coma
  | break punto_coma
  | continue punto_coma
  | return EXP punto_coma
  | return punto_coma
;

VARIABLE
  : TIPODATO id
  | TIPODATO LISTAID
  | TIPODATO id igual EXP
  | TIPODATO LISTAID igual EXP
  | id igual EXP
;

LISTAID
  : LISTAID id coma
  | id
;

TIPODATO
  : int
  | string
  | char
  | double
  | boolean
  | void
;

EXP
  : menos EXP
  | not EXP
  | EXP mas EXP
  | EXP menos EXP
  | EXP por EXP
  | EXP div EXP
  | EXP mod EXP
  | EXP potencia EXP
  | EXP igual_que EXP
  | EXP dif_que EXP
  | EXP mayor EXP
  | EXP mayor_igual EXP
  | EXP menor EXP
  | EXP menor_igual EXP
  | EXP or EXP
  | EXP and EXP
  | par_izq EXP par_der
  | id menos_menos
  | id mas_mas
  | number
  | cadena
  | char
  | decimal
  | true
  | false
  | TERNARIO
  | CAST
  | ACCESOVECTOR
  | ACCESOLISTA
;

TERNARIO
  : EXP interrogacion EXP dos_puntos EXP
;

CAST
  : par_izq TIPODATO par_der EXP
;

VECTOR
  : TIPODATO id cor_izq cor_der igual new TIPODATO cor_izq EXP cor_der
  | TIPODATO id cor_izq cor_der igual llave_izq LISTAVALORES llave_der
  | id cor_izq EXP cor_der igual EXP
;

LISTAVALORES
  : LISTAVALORES EXP coma
  | EXP
;

ACCESOVECTOR
  : id cor_izq EXP cor_der
;

LISTA
  : DynamicList menor TIPODATO mayor id igual new DynamicList menor TIPODATO mayor
;

AGREGARLISTA
  : append par_izq id coma EXP par_der
;

ACCESOLISTA
  : getvalue par_izq id coma EXP par_der
;

MODIFLISTA
  : setvalue par_izq id coma EXP coma EXP par_der
;

SENTIF
  : if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der SENTELSE
  | if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der else SENTIF
  | if par_izq EXP par_der llave_izq INSTRUCCIONES llave_der
;

SENTELSE
  : else llave_izq INSTRUCCIONES llave_der
;

SENTSWITCH
  : switch par_izq EXP par_der llave_izq LISTACASES llave_der
;

LISTACASES
  : LISTACASES SENTCASES
  | SENTDEFAULT
;

SENTCASES
  : case EXP dos_puntos INSTRUCCIONES 
;

SENTDEFAULT
  : default dos_puntos INSTRUCCIONES
;

SENTWHILE
  : while par_izq EXP par_der llave_izq INSTRUCCIONES llave_der
;

SENTFOR
  : for par_izq VARIABLE coma EXP coma EXP par_der llave_izq INSTRUCCIONES llave_der
;

SENTDOW
  : do llave_izq INSTRUCCIONES llave_der while par_izq EXP par_der
;

SENTFUN
  : TIPODATO id par_izq par_der llave_izq INSTRUCCIONES llave_der
  | TIPODATO id par_izq par_der llave_izq INSTRUCCIONES llave_der
;

LISTAPARAM
  :
;