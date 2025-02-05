import React, { useState, useEffect } from "react";
import axiosClient from "../services/axiosClient.ts";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: string;
}

const ModificarProducto: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Cargar productos
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("product")
      .then((response) => {
        setProducts(Array.isArray(response.data.products) ? response.data.products : []);
      })
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product || null);
    setIsModalOpen(true); // Abre el modal al seleccionar un producto
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
  
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const response = await axiosClient.put(`product/${selectedProduct.id}`, selectedProduct);
      setSuccess("Producto actualizado con éxito!");
  
      // Actualiza el producto en el estado local de productos
      setProducts((prevProducts) => 
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );
  
      setSelectedProduct(response.data); // Actualiza con la respuesta del servidor
    } catch (err) {
      setError("Error al actualizar el producto.");
    } finally {
      setLoading(false);
      setIsModalOpen(false); // Cierra el modal después de la actualización
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedProduct) return;

    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal cuando se hace clic fuera de él
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-4xl font-semibold mb-4">Modificar Producto</h2>

      {/* Mostrar productos en tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
            <p>{product.description}</p>
            <button
              onClick={() => handleSelectProduct(product.id)}
              className="mt-4 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Modificar
            </button>
          </div>
        ))}
      </div>

      {/* Modal para modificar el producto */}
      {isModalOpen && selectedProduct && (
  <div
    className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md transition-all duration-300 ease-in-out"
    onClick={handleCloseModal} // Cierra el modal al hacer clic fuera de él
  >
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3 transition-all duration-300 ease-in-out"
      onClick={(e) => e.stopPropagation()} // Impide que el clic en el modal cierre el modal
    >
      <h3 className="text-3xl font-semibold mb-4 text-white">Modificar Producto</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={selectedProduct.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Precio</label>
          <input
            type="text"
            name="price"
            value={selectedProduct.price}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Descripción</label>
          <textarea
            name="description"
            value={selectedProduct.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Imagen (URL)</label>
          <input
            type="text"
            name="image"
            value={selectedProduct.image}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Stock</label>
          <input
            type="text"
            name="stock"
            value={selectedProduct.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          {loading ? (
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-md"
              disabled
            >
              Actualizando...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700"
            >
              Actualizar Producto
            </button>
          )}
        </div>
      </form>

      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <button
        onClick={handleCloseModal}
        className="mt-4 text-red-500 underline"
      >
        Cerrar
      </button>
    </div>
  </div>
)}

  </div>
)}



export default ModificarProducto;
