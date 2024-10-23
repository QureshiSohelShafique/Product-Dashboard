import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/elasticsearchService';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css'; // Import the CSS file

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const productData = await fetchProducts();
      console.log(productData);
      setProducts(productData);
    }
    getProducts();
  }, []);

  const chartData = {
    labels: products.map(product => product._source.name),
    datasets: [
      {
        label: 'Stock Levels',
        data: products.map(product => product._source.stock),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Product Dashboard</h1>
      <div className="chart-container">
        {products.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product._source.name}</h2>
            <p>Category: {product._source.category}</p>
            <p>Price: ${product._source.price}</p>
            <p>Stock: {product._source.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
