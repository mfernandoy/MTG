import { anadir, info, actualizar, eliminar, obtener } from './firebase.js'

let id = 0

document.getElementById('btn-enviar').addEventListener('click', async () => {
    validarRecommend()
    validarOpinion()
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length === 0) {
        if (document.getElementById('btn-enviar').value === 'Enviar') {
            const formulario = {
                'nombreCompleto': document.getElementById('nombreCompleto').value,
                'email': document.getElementById('email').value,
                'fecha': document.getElementById('fecha').value,
                'producto': document.getElementById('producto').value,
                'calificacion': document.getElementById('calificacion').value,
                'comentario': document.getElementById('comentario').value,
                'opinion': document.querySelector('input[name="opinion"]:checked').value,
                'recomendacion': document.querySelector('input[name="recomendacion"]:checked').value,
                'sugerencias': document.getElementById('sugerencias').value
            }
            const agregado = await anadir(formulario);
            if(!agregado){
                Swal.fire({
                    title: "Error",
                    text: "Ese correo ya esta registrado",
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: "Enviado",
                    text: "Formulario enviado con exito",
                    icon: "success"
                }).then(() => {
                    limpiar()
                })
            }
        } else {
            const formulario = {
                'nombreCompleto': document.getElementById('nombreCompleto').value,
                'email': document.getElementById('email').value,
                'fecha': document.getElementById('fecha').value,
                'producto': document.getElementById('producto').value,
                'calificacion': document.getElementById('calificacion').value,
                'comentario': document.getElementById('comentario').value,
                'opinion': document.querySelector('input[name="opinion"]:checked').value,
                'recomendacion': document.querySelector('input[name="recomendacion"]:checked').value,
                'sugerencias': document.getElementById('sugerencias').value
            }
            actualizar(id,formulario)
            limpiar()

            id = 0
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    info((collection) => {
        let tabla = '';

        collection.forEach(doc => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.nombreCompleto}</td>
                <td>${item.email}</td>
                <td>${item.fecha}</td>
                <td>${item.producto}</td>
                <td>${item.calificacion}</td>
                <td>${item.comentario}</td>
                <td>${item.opinion}</td>
                <td>${item.recomendacion}</td>
                <td>${item.sugerencias}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });

        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const doc = await obtener(btn.id);
                const item =  doc.data();

                document.getElementById('nombreCompleto').value = item.nombreCompleto;
                document.getElementById('email').value = item.email;
                document.getElementById('fecha').value = item.fecha;
                document.getElementById('producto').value = item.producto;
                document.getElementById('calificacion').value = item.calificacion;
                document.getElementById('comentario').value = item.comentario;

                const opinionRadio = document.querySelector(`input[name="opinion"][value="${item.opinion}"]`);
                opinionRadio.checked = true;

                const recomendacionCheckbox = document.querySelector(`input[name="recomendacion"][value="${item.recomendacion}"]`);
                recomendacionCheckbox.checked = true;

                document.getElementById('sugerencias').value = item.sugerencias;

                id = btn.id;
            });
        });
    });
});