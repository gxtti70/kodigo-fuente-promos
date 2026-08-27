import { Promotion } from '../types/promotion';

const API_URL = 'http://localhost:4000/promotions';

export const fetchPromotions = async (): Promise<Promotion[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener las promociones');
  return response.json();
};

export const createPromotion = async (data: Omit<Promotion, 'id' | 'status'>): Promise<Promotion> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al guardar la promoción');
  return response.json();
};

export const deletePromotion = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar la promoción');
};
