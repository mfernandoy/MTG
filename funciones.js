import { anadir, info, actualizar, eliminar, obtener } from './firebase.js'

let id = 0

document.getElementById('boton-enviar').addEventListener('click', async () => {
    colorValida()
    document.querySelectorAll('.form-control').forEach(item => {
        verificacion(item.id)
    })

    if (document.querySelectorAll('.is-invalid').length === 0) {
        if (document.getElementById('boton-enviar').value === 'Enviar') {
            const form = {
                'nombre': document.getElementById('nombre').value,
                'serie': document.getElementById('serie').value,
                'fecha': document.getElementById('fecha').value,
                'edicion': document.getElementById('edicion').value,
                'color': document.querySelector('input[name="color"]:checked').value,
                'habilidad': document.getElementById('habilidad').value,
                'tipo': document.getElementById('tipo').value
            }
            const agregado = await anadir(form);
            if(!agregado){
                Swal.fire({
                    title: "Error",
                    text: "El N° de serie ya esta registrado",
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
            const form = {
                'nombre': document.getElementById('nombre').value,
                'serie': document.getElementById('serie').value,
                'fecha': document.getElementById('fecha').value,
                'edicion': document.getElementById('edicion').value,
                'color': document.querySelector('input[name="color"]:checked').value,
                'habilidad': document.getElementById('habilidad').value,
                'tipo': document.getElementById('tipo').value
            }
            actualizar(id,form)
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
                <td>${item.nombre}</td>
                <td>${item.serie}</td>
                <td>${item.fecha}</td>
                <td>${item.edicion}</td>
                <td>${item.color}</td>
                <td>${item.habilidad}</td>
                <td>${item.tipo}</td>
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
                    title: "¿Desea eliminar el registro?",
                    text: "No hay vuelta atras",
                    icon: "Error",
                    showCancelButton: true,
                    confirmButtonColor: "green",
                    cancelButtonColor: "red",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id);
                        Swal.fire({
                            title: "Eliminado",
                            text: "Registro eliminado",
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

                document.getElementById('nombre').value = item.nombre;
                document.getElementById('serie').value = item.tipo;
                document.getElementById('fecha').value = item.fecha;
                document.getElementById('edicion').value = item.edicion;
                document.getElementById('color').value = item.color;
                document.getElementById('habilidad').value = item.habilidad;
                document.getElementById('tipo').value = item.habilidad;

                const colorRadio = document.querySelector(`input[name="color"][value="${item.color}"]`);
                colorRadio.checked = true;

                document.getElementById('boton-enviar').value = 'Editar'

                id = btn.id;
            });
        });
    });
});
