import React, { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient.ts";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient.get("product")
      .then(response => {
        setProducts(Array.isArray(response.data.products) ? response.data.products : []);
      })
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section id="products" className="w-full py-20 text-center">
      <h3 className="text-5xl font-bold mb-12">Nuestros productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {products.map(({ id, name, description, image }) => (
          <div key={id} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <img src={image} alt={name} className="w-full h-55 object-cover mb-4 rounded-lg" />
            <h4 className="text-2xl font-semibold mb-2">{name}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
