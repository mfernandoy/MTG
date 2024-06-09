const verificar = (id) => {
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
        if (id == 'email'){
            if(!validarEmail(input.value)){
                input.classList.add('is-invalid')
            }
        }
    }
}

const calificacionNumber = document.getElementById('calificacionNumber')
calificacionNumber.innerHTML = 3

document.getElementById('calificacion').addEventListener('input', () => {
    calificacionNumber.innerHTML = document.getElementById('calificacion').value
})

const validarRecommend = () => {
    const recomendaciones = document.getElementsByName('recomendacion')
    let seleccion = false

    recomendaciones.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.classList.add('is-valid')
            checkbox.classList.remove('is-invalid')
            seleccion = true
        } else {
            checkbox.classList.add('is-invalid')
            checkbox.classList.remove('is-valid')
        }
    })

    if (seleccion) {
        recomendaciones.forEach(checkbox => {
            checkbox.classList.remove('is-invalid')
        })
    }
}

const validarOpinion = () => {
    const opiniones = document.getElementsByName('opinion')
    let seleccion = false

    opiniones.forEach(radio => {
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
        opiniones.forEach(radio => {
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
    const hoy = new Date()
    fecha = new Date(fecha)
    return fecha > hoy
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    return formato.test(email)
}
