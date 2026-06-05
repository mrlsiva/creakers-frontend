import React from 'react';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>✨ Happy Diwali ✨</h1>
          <p>Festival of Lights - Light up your celebrations with our premium crackers & fireworks</p>
          <div className="hero-cta">
            <a href="#products-page" className="btn btn-primary">Browse Products</a>
            <a href="#quick-enquiry" className="btn btn-secondary">Quick Enquiry</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="page-container">
        {/* Offer Banner */}
        <section style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
            color: '#8B0000',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>🎉 80% Discount Offer! 🎉</h2>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>Minimum order for Tamil Nadu ₹3,000/- | Other states ₹5,000/-</p>
            <p style={{ fontSize: '14px' }}>Limited time offer - Order before stocks end!</p>
          </div>
        </section>

        {/* How to Order Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#CC0033', fontSize: '28px' }}>How to Order</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {[
              { num: '1', title: 'Browse Products', desc: 'Choose from our wide range of crackers and fireworks' },
              { num: '2', title: 'Add to Cart', desc: 'Select your favorite products and add to cart' },
              { num: '3', title: 'Fill Details', desc: 'Enter your shipping and contact information' },
              { num: '4', title: 'Confirm Order', desc: 'Review and confirm your order placement' }
            ].map((step, idx) => (
              <div key={idx} style={{
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid #FFD700',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#CC0033',
                  color: 'white',
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  {step.num}
                </div>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips Preview */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#CC0033', fontSize: '28px' }}>Safety Tips</h2>
          <div style={{
            background: 'linear-gradient(135deg, #FFF8DC, #FFE4B5)',
            padding: '30px',
            borderRadius: '8px',
            borderLeft: '5px solid #FF8C00'
          }}>
            <ul style={{ columns: 2, gap: '20px', fontSize: '14px', lineHeight: '1.8' }}>
              <li>🔥 Always use crackers in open space</li>
              <li>👶 Keep away from children and pets</li>
              <li>💧 Have water and first aid nearby</li>
              <li>👁️ Wear safety goggles while lighting</li>
              <li>🌙 Don't burst after sunset</li>
              <li>📦 Store in cool, dry place</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          background: 'linear-gradient(135deg, #CC0033, #8B0000)',
          color: 'white',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '15px' }}>Ready for Diwali Celebrations?</h2>
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>Browse our complete collection and place your order today!</p>
          <a href="#quick-enquiry" className="btn btn-primary">Get Quick Enquiry Form</a>
        </section>
      </div>
    </div>
  );
};

export default Home;
