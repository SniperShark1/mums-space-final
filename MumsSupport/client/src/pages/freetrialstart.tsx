import React from 'react';
import { useNavigate } from 'react-router-dom';

const FreeTrialStart = () => {
  const navigate = useNavigate();

  const handleContinueToApp = () => {
    // Go to welcome page to select hub
    navigate('/welcome');
  };

  return (
    <div 
      style={{
        minHeight: '100vh', // Ensures it takes full viewport height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Removed padding here to eliminate extra whitespace
        backgroundImage: "url('/lovable-uploads/55463752-767b-400e-a8f4-11212a9a82f4.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{
          backgroundColor: 'rgba(247, 201, 199, 0.7)', // Your soft pink with opacity
          backdropFilter: 'blur(4px)', // Blur effect
          borderRadius: '1.5rem', // Rounded corners
          padding: '2rem', // Internal padding
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Shadow for depth
          border: '2px solid white', // White border
          textAlign: 'center', // Center content
          margin: '1rem', // Added margin to prevent content from touching screen edges on small devices
        }}>
          
          {/* Logo - Ensure this image path is correct and the file exists */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img 
              src="/lovable-uploads/3910644d-e8f9-46ef-a7e8-59449d817ec9.png" 
              alt="Mum's Space Logo" // This text only shows if the image fails to load
              style={{ width: '200px', height: 'auto' }} 
            />
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: '2.25rem', // text-4xl
            fontFamily: 'Bodoni Moda, serif', // font-bodoni
            fontWeight: 'bold',
            color: '#8E294F', // text-[#8E294F]
            marginBottom: '1rem', // mb-4
          }}>
            Welcome to Mum's Space!
          </h1>

          {/* Subheading */}
          <h2 style={{
            fontSize: '1.5rem', // text-2xl
            fontFamily: 'Bodoni Moda, serif', // font-bodoni
            fontWeight: '600', // font-semibold
            color: '#8E294F', // text-[#8E294F]
            marginBottom: '1.5rem', // mb-6
          }}>
            Your 3-day free trial starts now.
          </h2>

          {/* Body Text */}
          <p style={{
            fontSize: '1.125rem', // text-lg
            fontFamily: 'Bodoni Moda, serif', // font-bodoni
            color: '#8E294F', // text-[#8E294F]
            marginBottom: '2rem', // mb-8
            lineHeight: '1.625', // leading-relaxed
          }}>
            Enjoy full access to all the features of Mum's Space completely free for the next 3 days. 
            No credit card required until the trial ends.
          </p>

          {/* Features List */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // bg-white/20
            borderRadius: '0.5rem', // rounded-lg
            padding: '1.5rem', // p-6
            marginBottom: '2rem', // mb-8
            textAlign: 'left',
          }}>
            <h3 style={{
              fontSize: '1.125rem', // text-lg
              fontFamily: 'Bodoni Moda, serif', // font-bodoni
              fontWeight: 'bold',
              color: '#8E294F', // text-[#8E294F]
              marginBottom: '1rem', // mb-4
              textAlign: 'center',
            }}>What's Included:</h3>
            <ul style={{
              listStyleType: 'none', // Remove default list style
              padding: 0,
              margin: 0,
              fontFamily: 'Bodoni Moda, serif', // font-bodoni
              color: '#8E294F', // text-[#8E294F]
            }}>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#22c55e', marginRight: '0.5rem' }}>✓</span> {/* text-green-600 mr-2 */}
                Access to all age-specific content
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#22c55e', marginRight: '0.5rem' }}>✓</span>
                Stories, tips, and advice from other mums
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#22c55e', marginRight: '0.5rem' }}>✓</span>
                Tracking tools and resources
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#22c55e', marginRight: '0.5rem' }}>✓</span>
                Community support and chat
              </li>
            </ul>
          </div>

          {/* Buttons - Only "Start My Free Trial" remains */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}> {/* space-y-4 */}
            <button // Changed from <Button> to <button> to remove dependency on '@/components/ui/button'
              onClick={handleContinueToApp}
              style={{
                width: '100%', // w-full
                height: '3.5rem', // h-14
                borderRadius: '9999px', // rounded-full
                fontFamily: 'Bodoni Moda, serif', // font-bodoni
                fontSize: '1.125rem', // text-lg
                backgroundColor: '#F7C9C7', // bg-[#F7C9C7]
                color: '#8E294F', // text-[#8E294F]
                fontWeight: 'bold',
                border: '2px solid white', // border-2 border-white
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out', // hover:bg-[#F7C9C7]/80
              }}
            >
              Start My Free Trial
            </button>
            
            {/* Removed "Upgrade Now & Save" button */}
          </div>

          {/* Trial Info */}
          <div style={{ 
            marginTop: '1.5rem', // mt-6
            fontSize: '0.875rem', // text-sm
            color: 'rgba(142, 41, 79, 0.8)', // text-[#8E294F]/80
            fontFamily: 'Bodoni Moda, serif', // font-bodoni
          }}>
            <p>Trial ends automatically after 3 days.</p>
            <p>Cancel anytime from your account settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialStart;