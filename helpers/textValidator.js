export function textValidator(value, attribute) {
    if(!value || value.length <= 0) return `Ingrese el campo ${attribute}`
    return ''
}
