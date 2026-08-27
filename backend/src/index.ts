import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/prisma.js';
import promotionRoutes from './routes/promotion.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint obligatorio /health
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ status: 'UP', database: 'CONNECTED', timestamp: new Date() });
  } catch (error) {
    return res.status(500).json({ status: 'DOWN', database: 'DISCONNECTED', error: String(error) });
  }
});

// Registrar módulo de promociones
app.use('/promotions', promotionRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
