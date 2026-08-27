import React, { useEffect, useState, useRef } from 'react';
import { Promotion, DiscountType } from './types/promotion';
import { fetchPromotions, createPromotion, deletePromotion } from './services/api';

export default function App() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    productCategory: '',
    discountType: 'PERCENTAGE' as DiscountType,
    discountValue: 0,
    startDate: '',
    startTime: '00:00',
    endDate: '',
    endTime: '23:59',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchPromotions();
      setPromotions(data);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startDateTime = new Date(`${form.startDate}T${form.startTime}:00`).toISOString();
      const endDateTime = new Date(`${form.endDate}T${form.endTime}:00`).toISOString();

      await createPromotion({
        name: form.name,
        productCategory: form.productCategory,
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        startDate: startDateTime,
        endDate: endDateTime,
      });

      setForm({
        name: '',
        productCategory: '',
        discountType: 'PERCENTAGE',
        discountValue: 0,
        startDate: '',
        startTime: '00:00',
        endDate: '',
        endTime: '23:59',
      });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar esta promoción?')) return;
    try {
      await deletePromotion(id);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Módulo de Gestión de Promociones</h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.productCategory}
              onChange={(e) => setForm({ ...form, productCategory: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo Descuento</label>
            <select
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.discountType}
              onChange={(e) => setForm({ ...form, discountType: e.target.value as DiscountType })}
            >
              <option value="PERCENTAGE">Porcentaje (%)</option>
              <option value="FIXED_AMOUNT">Monto Fijo ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Valor Descuento</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.discountValue}
              onChange={(e) => setForm({ ...form, discountValue: parseFloat(e.target.value) || 0 })}
            />
          </div>

          {/* Fecha y Hora de Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
            <input
              type="date"
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
                setTimeout(() => startTimeRef.current?.showPicker(), 100);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
            <input
              type="time"
              ref={startTimeRef}
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          {/* Fecha y Hora de Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
            <input
              type="date"
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value={form.endDate}
              onChange={(e) => {
                setForm({ ...form, endDate: e.target.value });
                setTimeout(() => endTimeRef.current?.showPicker(), 100);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hora Fin</label>
            <input
              type="time"
              ref={endTimeRef}
              required
              className="mt-1 w-full border rounded-lg p-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors">
              Crear Promoción
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Cargando promociones...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Descuento</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {promotions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No hay promociones registradas aún.</td>
                  </tr>
                ) : (
                  promotions.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{p.name}</td>
                      <td className="p-4 text-gray-600">{p.productCategory}</td>
                      <td className="p-4 text-gray-600">
                        {p.discountType === 'PERCENTAGE' ? `${p.discountValue}%` : `$${p.discountValue}`}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {p.status || 'SCHEDULED'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => p.id && handleDelete(p.id)} className="text-red-600 hover:text-red-800 text-xs font-semibold">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
