export function lastNameValidator(apellido){
    const val = /[a-zA-Z]/ ;
    const number = /[0-9]+/;
    if(!apellido || apellido.length <= 0) return "Ingrese su apellido"
    
    if(!val.test(apellido) || number.test(apellido)) return 'No se permiten numeros'
}