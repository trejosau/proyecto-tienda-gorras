import React, { useEffect, useState } from "react";
import api from '../services/api'; // Importa la instancia de Axios

interface Product {
  id: string;
  name: string;
  description: string;
}

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("product")
    .then(response => {
      console.log("API Response:", response.data);
      setProducts(Array.isArray(response.data.products) ? response.data.products : []);
    })
  
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section id="products" className="w-full py-20 text-center">
      <h3 className="text-5xl font-bold mb-12">Nuestros Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {products.map(({ id, name, description }) => (
          <div key={id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">{name}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;