async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        
        const tbody = document.getElementById('productosTableBody');
        tbody.innerHTML = '';
        
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.descripcion || ''}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarProducto('${producto._id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function guardarProducto(e) {
    e.preventDefault();
    
    const productoId = document.getElementById('productoId').value;
    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };
    
    try {
        let response;
        if (productoId) {
            response = await fetch(`/api/productos/${productoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
        } else {
            response = await fetch('/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
        }
        
        if (response.ok) {
            limpiarFormularioProducto();
            cargarProductos();
        } else {
            console.error('Error al guardar producto');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editarProducto(id) {
    try {
        const response = await fetch(`/api/productos/${id}`);
        const producto = await response.json();
        
        document.getElementById('productoId').value = producto._id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion || '';
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        
        document.getElementById('productoFormTitle').textContent = 'Editar Producto';
    } catch (error) {
        console.error('Error al cargar producto:', error);
    }
}

async function eliminarProducto(id) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
        try {
            const response = await fetch(`/api/productos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                cargarProductos();
            } else {
                console.error('Error al eliminar producto');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function limpiarFormularioProducto() {
    document.getElementById('productoForm').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('productoFormTitle').textContent = 'Añadir Producto';
}