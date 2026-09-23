const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');

// GET - Obtener todos los cines (con populate de sus películas)
router.get('/', async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (err) {
    return next(err);
  }
});

// POST - Crear un nuevo cine
router.post('/', async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (err) {
    return next(err);
  }
});

// PUT - Añadir una película a un cine existente
router.put('/:id/add-movie', async (req, res, next) => {
  const { id } = req.params;
  const { movieId } = req.body;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { $push: { movies: movieId } },
      { new: true }
    ).populate('movies');

    if (!updatedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json(updatedCinema);
  } catch (err) {
    return next(err);
  }
});

// PUT - Modificar un cine
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json(updatedCinema);
  } catch (err) {
    return next(err);
  }
});

// DELETE - Eliminar un cine
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCinema = await Cinema.findByIdAndDelete(id);
    if (!deletedCinema) {
      return res.status(404).json({ message: 'Cine no encontrado' });
    }
    return res.status(200).json({ message: 'Cine eliminado correctamente', cinema: deletedCinema });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;