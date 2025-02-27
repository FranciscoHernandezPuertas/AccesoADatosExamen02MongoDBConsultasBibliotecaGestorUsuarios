const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
});

// Obtener un usuario específico
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
  }
});

module.exports = router;