document.addEventListener('DOMContentLoaded', function() {
    /*Cargar al inicio:*/
    cargarProductos();
    cargarUsuarios();
    
    document.getElementById('productoForm').addEventListener('submit', guardarProducto);
    document.getElementById('usuarioForm').addEventListener('submit', guardarUsuario);
    document.getElementById('cancelarProducto').addEventListener('click', limpiarFormularioProducto);
    document.getElementById('cancelarUsuario').addEventListener('click', limpiarFormularioUsuario);

    const closeButtons = document.querySelectorAll('.btn-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alert = this.closest('.alert');
            if (alert) {
                alert.style.display = 'none';
            }
        });
    });
});