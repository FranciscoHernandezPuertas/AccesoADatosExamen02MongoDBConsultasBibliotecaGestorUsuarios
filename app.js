const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://FranciscoHernandezPuertas:Fran1000@cluster0.gsfz9.mongodb.net/gestorPedidos?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión', err));

const express = require('express');
const path = require('path');
const app = express();

/*Configuración de EJS*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*Middlewares*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/*Importar rutas*/
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');

/*Rutas API*/
app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);

app.get('/docs', (req, res) => {
  const filePath = path.join(__dirname, 'Caso2GestorUsuarios.md');
  
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return res.status(404).send('Documento no encontrado');
    }

    /*Convertir Markdown a HTML*/
    const htmlContent = marked(content);
    
    /*Renderizar la plantilla con el contenido HTML */
    res.render('documentacion', { 
      titulo: 'Caso 2: Gestor de Usuarios',
      contenido: htmlContent
    });
  });
});

/*Ruta principal - Vista EJS*/
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Gestión de Pedidos' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));