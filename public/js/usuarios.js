async function cargarUsuarios() {
    try {
        const response = await fetch('/api/usuarios');
        const usuarios = await response.json();
        
        const tbody = document.getElementById('usuariosTableBody');
        tbody.innerHTML = '';
        
        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.direccionEnvio || ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarUsuario('${usuario._id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

async function guardarUsuario(e) {
    e.preventDefault();
    
    const usuarioId = document.getElementById('usuarioId').value;
    const usuario = {
        nombre: document.getElementById('nombreUsuario').value,
        email: document.getElementById('email').value,
        direccionEnvio: document.getElementById('direccionEnvio').value
    };
    
    try {
        let response;
        if (usuarioId) {
            response = await fetch(`/api/usuarios/${usuarioId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });
        } else {
            response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });
        }
        
        if (response.ok) {
            limpiarFormularioUsuario();
            cargarUsuarios();
        } else {
            console.error('Error al guardar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editarUsuario(id) {
    try {
        const response = await fetch(`/api/usuarios/${id}`);
        const usuario = await response.json();
        
        document.getElementById('usuarioId').value = usuario._id;
        document.getElementById('nombreUsuario').value = usuario.nombre;
        document.getElementById('email').value = usuario.email;
        document.getElementById('direccionEnvio').value = usuario.direccionEnvio || '';
        
        document.getElementById('usuarioFormTitle').textContent = 'Editar Usuario';
    } catch (error) {
        console.error('Error al cargar usuario:', error);
    }
}

async function eliminarUsuario(id) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        try {
            const response = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                cargarUsuarios();
            } else {
                console.error('Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function limpiarFormularioUsuario() {
    document.getElementById('usuarioForm').reset();
    document.getElementById('usuarioId').value = '';
    document.getElementById('usuarioFormTitle').textContent = 'Registrar Usuario';
}