export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email || email.length <= 0) return "Ingrese su correo electronico"
    if (!re.test(email)) return 'Ooops! Ingrese un correo valido'
    return ''
}