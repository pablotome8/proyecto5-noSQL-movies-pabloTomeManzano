const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// 1. GET - Obtener todas las películas
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// 2. GET - Obtener película por ID
router.get('/id/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    return res.status(200).json(movie);
  } catch (err) {
    return next(err);
  }
});

// 3. GET - Obtener por título
router.get('/title/:title', async (req, res, next) => {
  const { title } = req.params;
  try {
    const movies = await Movie.find({ title: new RegExp(title, 'i') });
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// 4. GET - Obtener por género
router.get('/genre/:genre', async (req, res, next) => {
  const { genre } = req.params;
  try {
    const movies = await Movie.find({ genre });
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// 5. GET - Obtener por año posterior a :year
router.get('/year/:year', async (req, res, next) => {
  const { year } = req.params;
  try {
    const movies = await Movie.find({ year: { $gt: Number(year) } });
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// 6. POST - Crear una nueva película
router.post('/', async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});

// 7. PUT - Modificar una película existente
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movieToUpdate = new Movie(req.body);
    movieToUpdate._id = id; // Mantener el mismo ID

    const updatedMovie = await Movie.findByIdAndUpdate(id, movieToUpdate, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada para actualizar' });
    }
    return res.status(200).json(updatedMovie);
  } catch (err) {
    return next(err);
  }
});

// 8. DELETE - Eliminar una película
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada para eliminar' });
    }
    return res.status(200).json({ message: 'Película eliminada correctamente', movie: deletedMovie });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;