import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useAuth } from '@clerk/clerk-react';

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: any;
  token?: string;
}

const getNetworkInfo = () => {
  try {
    return navigator.connection?.effectiveType || 'unknown';
  } catch (e) {
    return 'unknown';
  }
};

const trackEvent = (eventName: string, properties?: any) => {
  try {
    if (typeof window !== 'undefined' && window.analytics && window.analytics.track) {
      window.analytics.track(eventName, properties);
    }
  } catch (e) {
    console.error('Analytics error:', e);
  }
};

const feedbackStyles = `
  * {
    font-family: 'Bodoni Moda', serif;
    color: #8E294F; /* Changed to maroon */
  }

  .feedback {
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .feedback.loading {
    background-color: rgba(142, 41, 79, 0.15); /* Maroon with opacity */
    border: 1px solid #8E294F; /* Maroon */
  }

  .feedback.error {
    background-color: rgba(255, 0, 0, 0.2);
    border: 1px solid #8E294F; /* Maroon */
  }

  .feedback.success {
    background-color: rgba(0, 255, 0, 0.2);
    border: 1px solid #8E294F; /* Maroon */
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 1rem;
    color: #8E294F; /* Maroon */
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    background-color: #dafcff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    color: #8E294F; /* Maroon */
  }

  .form-group input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(142, 41, 79, 0.2); /* Maroon */
  }

  .password-container {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #8E294F;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    background-color: #8E294F; /* Maroon */
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .social-login button {
    margin: 0 6px;
    padding: 8px 16px;
    background: #8E294F; /* Maroon */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .forgot-password {
    text-align: center;
    margin-bottom: 1rem;
  }

  .forgot-password a {
    color: #8E294F; /* Maroon */
    text-decoration: underline;
    font-size: 0.95rem;
  }

  h1, h2 {
    text-align: center;
    color: #8E294F; /* Maroon */
  }
`;

const SignIn: React.FC = () => {
  const { signIn } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'loading' | 'error' | 'success' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Check for existing session on component mount
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("User is already signed in, redirecting to profile-setup");
      setFeedbackMessage('You are already signed in. Redirecting...');
      setFeedbackType('success');
      navigate('/profile-setup');
    }
  }, [isLoaded, isSignedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const bulletproofLogin = async (
    email: string,
    password: string,
    options: { rememberMe?: boolean } = {}
  ): Promise<LoginResponse> => {
    setFeedbackMessage('Logging in...');
    setFeedbackType('loading');
    setIsLoading(true);

    try {
      console.log("Attempting to sign in with Clerk");
      
      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log("Clerk sign-in result:", result);
      
      if (result.status === 'complete') {
        setFeedbackMessage('Login successful! Redirecting to profile setup...');
        setFeedbackType('success');
        trackEvent('Login Success', {
          timestamp: new Date().toISOString()
        });
        return { success: true, user: result.createdSessionId };
      } else if (result.status === 'needs_second_factor') {
        // Handle 2FA if needed
        setFeedbackMessage('Please complete two-factor authentication');
        setFeedbackType('loading');
        // You would handle 2FA here if needed
      } else {
        throw new Error('Login incomplete');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Check if the error is because a session already exists
      if (error.errors?.[0]?.message?.includes('already signed in') || 
          error.errors?.[0]?.message?.includes('session already exists')) {
        console.log("Session already exists, redirecting");
        setFeedbackMessage('You are already signed in. Redirecting...');
        setFeedbackType('success');
        
        // Force navigation to profile-setup
        setTimeout(() => {
          navigate('/profile-setup', { replace: true });
        }, 1000);
        
        return { success: true };
      }
      
      const errorMessage = error.errors?.[0]?.message || 'Login failed';
      console.log("Error message:", errorMessage);
      
      trackEvent('Login Failure', {
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
      
      throw new Error(errorMessage || 'Login failed');
    }

    throw new Error('Login failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bulletproofLogin(email, password, { rememberMe });
      
      // Force navigation to profile-setup after successful login
      console.log("Login successful, navigating to profile-setup");
      setTimeout(() => {
        navigate('/profile-setup', { replace: true });
      }, 1000);
    } catch (error) {
      setFeedbackMessage(error instanceof Error ? error.message : 'Login failed');
      setFeedbackType('error');
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const allowedProviders = ['google'];
    if (!allowedProviders.includes(provider)) return;

    setFeedbackMessage(`Redirecting to ${provider} login...`);
    setFeedbackType('loading');
    setIsLoading(true);
    trackEvent('Social Login Attempt', {
      provider,
      timestamp: new Date().toISOString()
    });
    
    // Ensure we're redirecting to profile-setup after social login
    signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/profile-setup'
    });
  };

  // Eye icon SVG for password visibility toggle
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {showPassword ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </>
      )}
    </svg>
  );

  // If user is already signed in, show a loading state
  if (isLoaded && isSignedIn) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(247, 201, 199, 0.7)',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ color: '#8E294F' }}>Already signed in</h2>
          <p style={{ color: '#8E294F' }}>Redirecting to profile setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundImage: "url('/lovable-uploads/hearts-bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        padding: '2rem',
        backgroundColor: 'rgba(247, 201, 199, 0.7)',
        borderRadius: '24px',
        border: '2px solid white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
      }}>
        <style>{feedbackStyles}</style>

        {!logoError ? (
          <img
            src="/lovable-uploads/3910644d-e8f9-46ef-a7e8-59449d817ec9.png"
            alt="Mum's Space Logo"
            onError={() => setLogoError(true)}
            style={{
              display: 'block',
              width: '180px',
              margin: '0 auto 2rem'
            }}
          />
        ) : (
          <h1>Welcome to Mum's Space</h1>
        )}

        <h2 id="signin-heading">Sign In</h2>

        <form onSubmit={handleSubmit} aria-labelledby="signin-heading">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '8px' }}>
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Centered forgot password link */}
          <div className="forgot-password">
            <a href="/reset-password">Forgot your password?</a>
          </div>

          {feedbackMessage && (
            <div
              ref={feedbackRef}
              id="login-feedback"
              className={`feedback ${feedbackType}`}
              role="status"
              aria-live="polite"
            >
              {feedbackMessage}
            </div>
          )}

          <button type="submit" disabled={isLoading} aria-busy={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="social-login" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p>Or sign in with:</p>
          <button 
            type="button" 
            onClick={() => handleSocialLogin('google')} 
            disabled={isLoading}
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;