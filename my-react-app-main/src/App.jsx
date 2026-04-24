import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const api = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchMensWear = async (category = 'all') => {
    setStatus('loading');
    try {
      let combined = [];
      if (category === 'all' || category === 'shirts') {
        const shirts = await axios.get(`${api}/products/category/mens-shirts`);
        combined = [...combined, ...shirts.data.products];
      }
      if (category === 'all' || category === 'shoes') {
        const shoes = await axios.get(`${api}/products/category/mens-shoes`);
        combined = [...combined, ...shoes.data.products];
      }
      setProducts(combined.slice(0, 8));
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchMensWear();
  }, []);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    fetchMensWear(cat);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-icon">◆</span>
            AURELIUS
          </div>
          <div className="nav-links">
            <a href="#">New Arrivals</a>
            <a href="#">Collections</a>
            <a href="#">About</a>
          </div>
          <div className="nav-right">
            <button className="cart-btn" onClick={() => fetchMensWear(activeCategory)}>
              ↻ Refresh
            </button>
            <div className="cart-badge">
              🛒 <span>{totalItems}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">New Season 2025</p>
          <h1 className="hero-title">Dress With<br /><span>Intention.</span></h1>
          <p className="hero-sub">Premium men's essentials — crafted for the modern gentleman.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.querySelector('.shop-section').scrollIntoView({ behavior: 'smooth' })}>
              Shop Now
            </button>
            <button className="btn-ghost">View Lookbook</button>
          </div>
        </div>
        <div className="hero-badge">
          <div className="badge-ring">
            <span>FREE SHIPPING · WORLDWIDE ·</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="shop-section">
        <div className="section-header">
          <h2>The Collection</h2>
          <div className="filters">
            {['all', 'shirts', 'shoes'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeletons */}
        {status === 'loading' && (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="skeleton-img shimmer"></div>
                <div className="skeleton-text shimmer short"></div>
                <div className="skeleton-text shimmer"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="error-box">
            <div className="error-icon">⚠</div>
            <h3>Connection Failed</h3>
            <p>Couldn't load the collection. Check your network and try again.</p>
            <button className="btn-primary" onClick={() => fetchMensWear(activeCategory)}>
              Retry
            </button>
          </div>
        )}

        {/* Product Grid */}
        {status === 'success' && (
          <div className="product-grid">
            {products.map((item) => (
              <div key={item.id} className="product-card">
                <div className="card-image">
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  {item.discountPercentage > 15 && (
                    <span className="badge-hot">HOT</span>
                  )}
                  <div className="card-overlay">
                    <button className="quick-add" onClick={() => addToCart(item)}>
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-meta">
                    <span className="card-brand">Essentials</span>
                    <span className="card-rating">★ {item.rating?.toFixed(1)}</span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-footer">
                    <span className="card-price">${item.price}</span>
                    <button className="add-btn" onClick={() => addToCart(item)} aria-label="Add to cart">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Banner Strip */}
      <div className="promo-strip">
        <span>✦ Free Returns</span>
        <span>✦ Secure Checkout</span>
        <span>✦ Premium Quality</span>
        <span>✦ Worldwide Shipping</span>
        <span>✦ Free Returns</span>
        <span>✦ Secure Checkout</span>
        <span>✦ Premium Quality</span>
        <span>✦ Worldwide Shipping</span>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">◆ AURELIUS</div>
            <p>Premium men's fashion since 2020.</p>
          </div>
          <div className="footer-links">
            <h4>Shop</h4>
            <a href="#">New Arrivals</a>
            <a href="#">Shirts</a>
            <a href="#">Shoes</a>
          </div>
          <div className="footer-links">
            <h4>Help</h4>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Aurelius Men's Boutique · London · New York · Dubai
        </div>
      </footer>
    </div>
  );
}

export default App;
