
    export let texto_salida=[];
    try{
        
function Principal(){

texto_salida.push("-----------Factorial Iterativo---------")

texto_salida.push("8! = "+
factorialIterativo(8))

texto_salida.push("-----------Factorial Recursivo---------")

texto_salida.push("8! = "+
factorialRecursivo(5))

} 

function factorialIterativo(n){

let resultado =1 
for(
let i =1 
;i<=n;i++){
resultado = resultado*i; 

}

return resultado
} 

function factorialRecursivo(n){
if(n==0){

return 1}else{
} 

return (n*
factorialRecursivo(n-1))
} 

Principal()
    }catch(error){
        console.log(error);
    }
    