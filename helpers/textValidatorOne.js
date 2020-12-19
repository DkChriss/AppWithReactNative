export function textValidator(text){
    const val = /^\d+$/;
    if(!text || text.length <= 0) return "Ingrese su nombre"
    
    if(val.test(text)) return 'No se permiten numeros'
}

