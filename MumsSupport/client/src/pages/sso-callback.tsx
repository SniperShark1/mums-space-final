import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';

const SSOCallback = () => {
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    // Handle the OAuth callback
    signIn?.attemptFirstFactor({
      strategy: "oauth_callback",
      redirectUrl: "/sso-callback",
    })
      .then((result) => {
        if (result.status === 'complete') {
          navigate('/profile-setup');
        }
      })
      .catch((err) => {
        console.error('OAuth error', err);
        navigate('/sign-in');
      });
  }, [isLoaded, signIn, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <p>Completing login...</p>
    </div>
  );
};

export default SSOCallback;