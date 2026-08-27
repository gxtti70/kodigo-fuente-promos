import { Router } from 'express';
import { getPromotions, createPromotion, deletePromotion } from '../controllers/promotion.controller.js';

const router = Router();

router.get('/', getPromotions);
router.post('/', createPromotion);
router.delete('/:id', deletePromotion);

export default router;
