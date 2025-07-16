/**
 * Bulletproof Login System
 * Handles retries, network issues, and provides user feedback
 */

/**
 * Enterprise-grade login function with advanced security features
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} - User data on successful login
 */
async function bulletproofLogin(email, password, options = {}) {
  const {
    maxAttempts = 3,
    feedbackElement = document.getElementById('login-feedback'),
    onSuccess = null,
    onError = null,
    apiEndpoint = '/api/login'
  } = options;
  
  const startTime = performance.now();
  let lastError = null;
  
  // Show loading state
  if (feedbackElement) {
    feedbackElement.innerHTML = 'Logging in...';
    feedbackElement.className = 'feedback loading';
  }
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Update UI if multiple attempts
      if (attempt > 1 && feedbackElement) {
        feedbackElement.innerHTML = `Retrying login (attempt ${attempt}/${maxAttempts})...`;
      }
      
      const response = await fetch(apiEndpoint, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensures cookies are sent/received
        cache: 'no-cache',
        redirect: 'follow'
      });
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 60;
        lastError = `Too many attempts. Please try again in ${retryAfter} seconds.`;
        if (feedbackElement) {
          feedbackElement.innerHTML = lastError;
          feedbackElement.className = 'feedback error';
        }
        break; // Don't retry if rate limited
      }
      
      const data = await response.json().catch(() => ({ 
        success: false, 
        message: 'Invalid server response' 
      }));
      
      if (response.ok && data.success) {
        // Success case
        if (feedbackElement) {
          feedbackElement.innerHTML = 'Login successful!';
          feedbackElement.className = 'feedback success';
        }
        
        // Log telemetry for debugging
        console.log(`Login metrics: 
          Attempts: ${attempt}/${maxAttempts}
          Network: ${navigator.connection?.effectiveType || 'unknown'}
          Timing: ${performance.now() - startTime}ms`);
        
        // Call success callback if provided
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(data);
        }
        
        return data;
      } else {
        // Server returned error
        lastError = data.message || `Error: ${response.status} ${response.statusText}`;
        console.warn(`Login attempt ${attempt} failed:`, lastError);
        
        // Don't retry for certain errors
        if (data.lockout || data.code === 'INVALID_CREDENTIALS') {
          break;
        }
      }
    } catch (error) {
      lastError = error.message || 'Network error';
      console.error(`Login attempt ${attempt} error:`, error);
      
      // Only retry for network-related errors
      if (!navigator.onLine) {
        lastError = 'You appear to be offline. Please check your internet connection.';
        break;
      }
    }
    
    if (attempt < maxAttempts) {
      // Exponential backoff with jitter
      const delay = Math.min(1000 * Math.pow(2, attempt-1) + Math.random() * 1000, 8000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // All attempts failed
  if (feedbackElement) {
    feedbackElement.innerHTML = lastError || 'Login failed after multiple attempts';
    feedbackElement.className = 'feedback error';
  }
  
  // Log failure telemetry
  console.log(`Failed login metrics: 
    Attempts: ${maxAttempts}/${maxAttempts}
    Network: ${navigator.connection?.effectiveType || 'unknown'}
    Timing: ${performance.now() - startTime}ms
    Error: ${lastError}`);
  
  // Call error callback if provided
  if (onError && typeof onError === 'function') {
    onError(new Error(lastError || 'Login failed after multiple attempts'));
  }
  
  throw new Error(lastError || 'Login failed after multiple attempts');
}