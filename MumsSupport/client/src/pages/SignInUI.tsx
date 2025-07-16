// src/pages/SignInUI.tsx
import React from 'react';
import Logo from '@/assets/logo.png'; // Update with your actual logo path

interface SignInUIProps {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  feedbackMessage: string;
  feedbackType: 'loading' | 'error' | 'success' | '';
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
  onGithubSignIn: () => void;
  feedbackRef: React.RefObject<HTMLDivElement>;
}

// CSS styles for the UI
const styles = `
  :root {
    --primary-color: #F8B4D9; /* Your brand pink color */
    --primary-dark: #8E294F;
    --text-color: #333333;
    --background-color: #FFFFFF;
    --accent-color: #F8B4D9;
  }

  .sign-in-container {
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--background-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .brand-logo {
    display: block;
    width: 180px;
    margin: 0 auto 2rem;
  }

  h1 {
    color: var(--primary-dark);
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(248, 180, 217, 0.2);
  }

  .remember-me {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .remember-me input {
    margin-right: 8px;
    width: auto !important;
  }
  
  .forgot-password {
    margin: 10px 0;
  }

  .forgot-password a {
    color: var(--primary-color);
    text-decoration: none;
  }

  .forgot-password a:hover {
    text-decoration: underline;
  }

  button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button[type="submit"]:hover {
    background-color: var(--primary-dark);
  }

  button[type="submit"]:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .feedback {
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .feedback.loading {
    background-color: #f0f8ff;
    border: 1px solid #b8d6f3;
    color: #0066cc;
  }

  .feedback.error {
    background-color: #fff0f0;
    border: 1px solid #f3b8b8;
    color: #d32f2f;
  }

  .feedback.success {
    background-color: #f0fff0;
    border: 1px solid #b8f3b8;
    color: #388e3c;
  }
  
  .social-login {
    margin-top: 20px;
    text-align: center;
  }
  
  .social-login p {
    margin-bottom: 10px;
    color: var(--text-color);
  }
  
  .social-login button {
    margin: 0 10px;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #e0e0e0;
    color: var(--text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .social-login button:hover {
    background-color: #f5f5f5;
    border-color: #d0d0d0;
  }
  
  .social-login button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SignInUI: React.FC<SignInUIProps> = ({
  email,
  password,
  rememberMe,
  isLoading,
  feedbackMessage,
  feedbackType,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  onGoogleSignIn,
  onGithubSignIn,
  feedbackRef
}) => {
  return (
    <div className="sign-in-container">
      <style>{styles}</style>
      
      <img src={Logo} alt="Mum's Space Logo" className="brand-logo" />
      <h1 id="signin-heading">Sign In</h1>
      
      <form 
        onSubmit={onSubmit}
        aria-labelledby="signin-heading"
        aria-describedby={feedbackMessage ? 'login-feedback' : undefined}
      >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            disabled={isLoading}
            aria-required="true"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            disabled={isLoading}
            aria-required="true"
            required
          />
        </div>
        
        {/* Remember me checkbox */}
        <div className="form-group remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={onRememberMeChange}
            disabled={isLoading}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        
        {/* Forgot password link */}
        <div className="forgot-password">
          <a href="/reset-password">Forgot your password?</a>
        </div>
        
        {/* Feedback element */}
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
        
        <button 
          type="submit" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      {/* Social login options */}
      <div className="social-login">
        <p>Or sign in with:</p>
        <button 
          type="button" 
          onClick={onGoogleSignIn}
          disabled={isLoading}
        >
          Google
        </button>
        <button 
          type="button" 
          onClick={onGithubSignIn}
          disabled={isLoading}
        >
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SignInUI;