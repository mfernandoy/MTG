const verificacion = (id) => {
    const input = document.getElementById(id)
    input.classList.remove('is-invalid')

    if (input.value.trim() === '') {
        input.classList.add('is-invalid')
    } else {
        input.classList.add('is-valid')
        if (id === 'fecha') {
            if (validarFecha(input.value)) {
                input.classList.add('is-invalid')
            }
        }
    }
}
const colorValida = () => {
    const colores = document.getElementsByName('color')
    let seleccion = false

    colores.forEach(radio => {
        if (radio.checked) {
            radio.classList.add('is-valid')
            radio.classList.remove('is-invalid')
            seleccion = true
        } else {
            radio.classList.add('is-invalid')
            radio.classList.remove('is-valid')
        }
    })

    if (seleccion) {
        colores.forEach(radio => {
            radio.classList.remove('is-invalid')
        })
    }
}

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-valid')
        item.classList.remove('is-invalid')
    })
    document.querySelectorAll('.form-check-input').forEach(items => {
        items.classList.remove('is-valid')
        items.classList.remove('is-invalid')
    })
}

const validarFecha = (fecha) => {
    const salida = new Date()
    fecha = new Date(fecha)
    return fecha > salida
}
