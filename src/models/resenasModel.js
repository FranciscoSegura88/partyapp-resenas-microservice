import pool from '../database.js';

export async function crearReseña(data) {
  const { id_reseñador, tipo_reseñador, id_reseñado, tipo_reseñado, puntuacion, comentario } = data;
  const query = `
    INSERT INTO resenas (id_resenador, tipo_resenador, id_resenado, tipo_resenado, puntuacion, comentario)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const [result] = await pool.execute(query, [
    id_reseñador,
    tipo_reseñador,
    id_reseñado,
    tipo_reseñado,
    puntuacion,
    comentario
  ]);

  return { id: result.insertId, ...data };
}

export async function obtenerReseñasPara(tipo, id) {
  const query = `
    SELECT * FROM resenas
    WHERE tipo_reseñado = ? AND id_reseñado = ?
    ORDER BY fecha_creacion DESC;
  `;
  const [rows] = await pool.execute(query, [tipo, id]);
  return rows;
}

export async function obtenerReseñasPor(tipo, id) {
  const query = `
    SELECT * FROM resenas
    WHERE tipo_resenador = ? AND id_resenador = ?
    ORDER BY fecha_creacion DESC;
  `;
  const [rows] = await pool.execute(query, [tipo, id]);
  return rows;
}

export async function eliminarReseña(id) {
  const query = `DELETE FROM resenas WHERE id = ?`;
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
}
