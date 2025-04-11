import { crearReseña, obtenerReseñasPara, obtenerReseñasPor, eliminarReseña } from '../models/reseñaModel.js';

export async function crear(req, res) {
  try {
    const nuevaReseña = await crearReseña(req.body);
    res.status(201).json(nuevaReseña);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error creando la reseña' });
  }
}

export async function obtenerPara(req, res) {
  try {
    const { tipo, id } = req.params;
    const reseñas = await obtenerReseñasPara(tipo, id);
    res.json(reseñas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo reseñas' });
  }
}

export async function obtenerPor(req, res) {
  try {
    const { tipo, id } = req.params;
    const reseñas = await obtenerReseñasPor(tipo, id);
    res.json(reseñas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo reseñas' });
  }
}

export async function eliminar(req, res) {
  try {
    const { id } = req.params;
    const reseñaEliminada = await eliminarReseña(id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json({ mensaje: 'Reseña eliminada', reseña: reseñaEliminada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error eliminando reseña' });
  }
}
