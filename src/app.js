import express from 'express';
import cors from 'cors';
import reseñasRoutes from './routes/resenasRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/reseñas', reseñasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Microservicio de reseñas corriendo en el puerto ${PORT}`);
});
