export function nickNameValidator(alias){
    const val = /[a-zA-Z]/ ;
    const number = /[0-9]+/;
    if(!alias || alias.length <= 0) return "Ingrese su apodo"
    
    if(!val.test(alias) || number.test(alias)) return 'No se permiten numeros'
}