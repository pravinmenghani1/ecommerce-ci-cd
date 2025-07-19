import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using mock data
    const mockProducts = [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://via.placeholder.com/300x200?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation.'
      },
      {
        id: 2,
        name: 'Smartphone',
        price: 699.99,
        image: 'https://via.placeholder.com/300x200?text=Smartphone',
        description: 'Latest smartphone with advanced camera and long battery life.'
      },
      {
        id: 3,
        name: 'Laptop',
        price: 1299.99,
        image: 'https://via.placeholder.com/300x200?text=Laptop',
        description: 'Powerful laptop for work and gaming.'
      },
      {
        id: 4,
        name: 'Smartwatch',
        price: 249.99,
        image: 'https://via.placeholder.com/300x200?text=Smartwatch',
        description: 'Track your fitness and stay connected with this smartwatch.'
      },
      {
        id: 5,
        name: 'Wireless Speaker',
        price: 129.99,
        image: 'https://via.placeholder.com/300x200?text=Speaker',
        description: 'Portable wireless speaker with amazing sound quality.'
      },
      {
        id: 6,
        name: 'Tablet',
        price: 499.99,
        image: 'https://via.placeholder.com/300x200?text=Tablet',
        description: 'Lightweight tablet perfect for entertainment and productivity.'
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Welcome to Our E-Commerce Store</h1>
      <p>Discover our amazing products at great prices!</p>
      
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
