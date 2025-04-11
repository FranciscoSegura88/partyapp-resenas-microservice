import { Router } from 'express';
import { crearReseña, obtenerReseñasPara, obtenerReseñasPor, eliminarReseña } from '../models/resenasModel.js';

const router = Router();

// Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaReseña = await crearReseña(req.body);
    res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ error: 'Error al crear la reseña' });
  }
});

// Obtener reseñas hechas hacia un usuario/artista
router.get('/para/:tipo/:id', async (req, res) => {
  const { tipo, id } = req.params;
  try {
    const reseñas = await obtenerReseñasPara(tipo, id);
    res.json(reseñas);
  } catch (error) {
    console.error('Error al obtener reseñas para:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Obtener reseñas hechas por un usuario/artista
router.get('/por/:tipo/:id', async (req, res) => {
  const { tipo, id } = req.params;
  try {
    const reseñas = await obtenerReseñasPor(tipo, id);
    res.json(reseñas);
  } catch (error) {
    console.error('Error al obtener reseñas por:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Eliminar reseña
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const success = await eliminarReseña(id);
    if (success) {
      res.json({ message: 'Reseña eliminada' });
    } else {
      res.status(404).json({ error: 'Reseña no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
});

export default router;
