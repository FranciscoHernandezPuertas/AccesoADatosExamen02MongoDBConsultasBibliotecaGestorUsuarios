const mongoose = require('mongoose');
     const usuarioSchema = new mongoose.Schema({
       nombre: { type: String, required: true },
       email: { type: String, required: true },
       direccionEnvio: String
     });
     module.exports = mongoose.model('Usuario', usuarioSchema);