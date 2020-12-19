export function nickNameValidator(alias){
    const val = /^\d+$/;
    if(!alias || alias.length <= 0) return "Ingrese su apodo"
    
    if(val.test(alias)) return 'No se permiten numeros'
}