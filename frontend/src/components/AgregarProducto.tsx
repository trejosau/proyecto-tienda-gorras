import React, { useState } from "react";
import axiosClient from "../services/axiosClient.ts";

const AgregarProducto: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post("product", {
        name,
        price: parseFloat(price), // Convertir a número decimal
        description,
        image,
        stock: Number(stock),
      });
      setSuccess("Producto agregado con éxito!");
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setStock("");
    } catch (err) {
      setError("Error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Acepta solo números y un punto decimal
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permite números y el valor vacío
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setStock(value);
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col p-8">
      <h2 className="text-4xl text-black font-bold text-center mb-4">Agregar productos</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Nombre del Producto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Precio</label>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ingrese el precio"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ingrese una descripción del producto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Imagen (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ingrese la URL de la imagen"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Stock</label>
          <input
            type="text"
            value={stock}
            onChange={handleStockChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Ingrese el stock disponible"
          />
        </div>

        {loading ? (
          <button type="submit" className="w-full bg-gray-600 text-white py-2 rounded-md" disabled>
            Agregando...
          </button>
        ) : (
          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700">
            Agregar Producto
          </button>
        )}

        {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AgregarProducto;
