export function equalPasswordValidator(equalPassword, password) {
    if (!password || password.length <= 0) {
        return "Ingrese la contraseña"
    } 
    if (password !== equalPassword) {
        return "Las contraseñas no coinciden"
    }
    return "";
}
