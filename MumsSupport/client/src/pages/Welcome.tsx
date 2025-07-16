import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    console.log("Welcome Page: Button clicked for category:", category);

    localStorage.setItem('selectedCategory', category);

    if (category === 'Ages 2-5') {
      const url = "https://preview--mums-space-welcome-kit.lovable.app/story-menu-2-5-hub";
      console.log("Welcome Page: Redirecting to:", url);
      window.location.href = url;
    } else if (category === 'Ages 0-1') {
      const url = "https://preview--mums-space-welcome-kit.lovable.app/ages-0-1-hub";
      console.log("Welcome Page: Redirecting to:", url);
      window.location.href = url;
    } else if (category === 'Mums to Be') {
      const url = "https://preview--mums-space-welcome-kit.lovable.app/mums-to-be-hub";
      console.log("Welcome Page: Redirecting to:", url);
      window.location.href = url;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundImage: "url('/lovable-uploads/55463752-767b-400e-a8f4-11212a9a82f4.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{
          backgroundColor: 'rgba(247, 201, 199, 0.7)',
          backdropFilter: 'blur(4px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '2px solid white',
          textAlign: 'center',
        }}>

          {/* Welcome Message - Logo and its container have been removed */}
          <h1 style={{
            fontSize: '2.25rem',
            fontFamily: 'Bodoni Moda, serif',
            fontWeight: 'bold',
            color: '#8E294F',
            marginBottom: '1rem',
          }}>
            Welcome to Mum's Space
          </h1>

          <p style={{
            fontSize: '1.25rem',
            fontFamily: 'Bodoni Moda, serif',
            color: '#8E294F',
            marginBottom: '2rem',
          }}>
            Choose your journey:
          </p>

          {/* Category Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => handleCategorySelect('Mums to Be')}
              style={{
                width: '100%',
                height: '56px',
                borderRadius: '9999px',
                fontFamily: 'Bodoni Moda, serif',
                fontSize: '1.125rem',
                backgroundColor: '#F7C9C7',
                color: '#8E294F',
                fontWeight: 'bold',
                border: '2px solid white',
                cursor: 'pointer',
              }}
            >
              Mums to Be
            </button>

            <button
              onClick={() => handleCategorySelect('Ages 0-1')}
              style={{
                width: '100%',
                height: '56px',
                borderRadius: '9999px',
                fontFamily: 'Bodoni Moda, serif',
                fontSize: '1.125rem',
                backgroundColor: '#F7C9C7',
                color: '#8E294F',
                fontWeight: 'bold',
                border: '2px solid white',
                cursor: 'pointer',
              }}
            >
              0–1 Years
            </button>

            <button
              onClick={() => handleCategorySelect('Ages 2-5')}
              style={{
                width: '100%',
                height: '56px',
                borderRadius: '9999px',
                fontFamily: 'Bodoni Moda, serif',
                fontSize: '1.125rem',
                backgroundColor: '#F7C9C7',
                color: '#8E294F',
                fontWeight: 'bold',
                border: '2px solid white',
                cursor: 'pointer',
              }}
            >
              2–5 Years
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;