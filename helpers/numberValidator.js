export function numberValidator(number){
    const val = /^\d+$/;
    if(!number || number.length <= 0) return "Ingrese su numero de celular"   
   if(!val.test(number)) return 'No se permiten letras'
}
