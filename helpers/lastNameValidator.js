export function lastNameValidator(apellido){
    const val = /^\d+$/;
    if(!apellido || apellido.length <= 0) return "Ingrese su apellido"
    
    if(val.test(apellido)) return 'No se permiten numeros'
}