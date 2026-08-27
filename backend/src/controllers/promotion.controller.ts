import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(promotions);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las promociones', details: String(error) });
  }
};

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const { name, productCategory, discountType, discountValue, startDate, endDate } = req.body;
    const newPromo = await prisma.promotion.create({
      data: {
        name,
        productCategory,
        discountType,
        discountValue: parseFloat(discountValue),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    return res.status(201).json(newPromo);
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear la promoción', details: String(error) });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.promotion.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: 'Error al eliminar la promoción', details: String(error) });
  }
};
