export function textValidator(text){
    const val = /[a-zA-Z]/ ;
    const number = /[0-9]+/;
    if(!text || text.length <= 0) return "Ingrese su nombre"
    
    if(!val.test(text) || number.test(text)) return 'No se permiten numeros'
}

