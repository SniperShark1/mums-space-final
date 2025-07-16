<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Clerk Sign-In</title>
    <style>
        :root {
            --clerk-primary: #3b82f6;
            --clerk-primary-hover: #2563eb;
            --clerk-error: #ef4444;
            --clerk-success: #10b981;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #111827;
        }
        .clerk-container {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
            padding: 2rem;
            width: 100%;
            max-width: 28rem;
        }
        .clerk-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .clerk-header h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #111827;
        }
        .clerk-header p {
            color: #6b7280;
            margin: 0;
        }
        .clerk-form-group {
            margin-bottom: 1.25rem;
        }
        .clerk-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            color: #374151;
        }
        .clerk-input {
            width: 100%;
            padding: 0.625rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            box-sizing: border-box;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        .clerk-input:focus {
            outline: none;
            border-color: var(--clerk-primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .clerk-button {
            width: 100%;
            padding: 0.625rem;
            background-color: var(--clerk-primary);
            color: white;
            border: none;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s;
        }
        .clerk-button:hover {
            background-color: var(--clerk-primary-hover);
        }
        .clerk-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        .clerk-error {
            color: var(--clerk-error);
            margin-top: 0.5rem;
            font-size: 0.75rem;
            display: none;
        }
        .clerk-success {
            color: var(--clerk-success);
            margin-top: 0.5rem;
            font-size: 0.75rem;
            display: none;
        }
        .clerk-loading {
            display: none;
            text-align: center;
            margin-top: 1rem;
            font-size: 0.875rem;
            color: #6b7280;
        }
        .clerk-spinner {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid rgba(59, 130, 246, 0.2);
            border-radius: 50%;
            border-top-color: var(--clerk-primary);
            animation: clerk-spin 1s linear infinite;
            margin-right: 0.5rem;
            vertical-align: middle;
        }
        @keyframes clerk-spin {
            to { transform: rotate(360deg); }
        }
        .clerk-footer {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #6b7280;
        }
        .clerk-footer a {
            color: var(--clerk-primary);
            text-decoration: none;
            font-weight: 500;
        }
        .clerk-footer a:hover {
            text-decoration: underline;
        }
        .clerk-divider {
            display: flex;
            align-items: center;
            margin: 1.5rem 0;
            color: #9ca3af;
            font-size: 0.875rem;
        }
        .clerk-divider::before, .clerk-divider::after {
            content: "";
            flex: 1;
            border-bottom: 1px solid #e5e7eb;
        }
        .clerk-divider::before {
            margin-right: 0.75rem;
        }
        .clerk-divider::after {
            margin-left: 0.75rem;
        }
        .clerk-oauth-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }
        .clerk-oauth-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            background-color: white;
            cursor: pointer;
            transition: background-color 0.15s;
        }
        .clerk-oauth-button:hover {
            background-color: #f9fafb;
        }
        .clerk-oauth-button img {
            width: 1.25rem;
            height: 1.25rem;
        }
        #fatalErrorFallback {
            display: none;
            color: #ef4444;
            text-align: center;
            margin: 2rem;
        }
        #fatalErrorFallback h2 {
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <!-- Fallback error message (hidden by default) -->
    <div id="fatalErrorFallback">
      <h2>Something went wrong</h2>
      <p>Sorry, we couldn't load the sign-in page. Please try again later.</p>
    </div>

    <div class="clerk-container">
        <div class="clerk-header">
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
        </div>
        <div class="clerk-oauth-buttons">
            <button type="button" class="clerk-oauth-button" id="google-oauth">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google">
            </button>
            <button type="button" class="clerk-oauth-button" id="github-oauth">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
            </button>
        </div>
        <div class="clerk-divider">or</div>
        <form id="clerkSignInForm">
            <div class="clerk-form-group">
                <label for="clerkEmail" class="clerk-label">Email address</label>
                <input type="email" id="clerkEmail" name="email" class="clerk-input" required autocomplete="email">
                <div class="clerk-error" id="clerkEmailError"></div>
            </div>
            <div class="clerk-form-group">
                <label for="clerkPassword" class="clerk-label">Password</label>
                <input type="password" id="clerkPassword" name="password" class="clerk-input" required autocomplete="current-password" minlength="8">
                <div class="clerk-error" id="clerkPasswordError"></div>
            </div>
            <button type="submit" class="clerk-button" id="clerkSubmitBtn">Sign In</button>
            <div class="clerk-success" id="clerkSuccessMessage"></div>
            <div class="clerk-loading" id="clerkLoading">
                <span class="clerk-spinner"></span> Signing in...
            </div>
        </form>
        <div class="clerk-footer">
            <p>Don't have an account? <a href="/sign-up" id="clerkSignUpLink">Sign up</a></p>
            <p><a href="/forgot-password" id="clerkForgotPassword">Forgot password?</a></p>
        </div>
    </div>

    <script>
    // Failsafe: If anything in this script throws, show the fallback error UI
    try {
        document.addEventListener('DOMContentLoaded', function() {
            // Global error handlers
            window.addEventListener('error', handleGlobalError);
            window.addEventListener('unhandledrejection', handleGlobalPromiseRejection);

            // Form elements
            const signInForm = document.getElementById('clerkSignInForm');
            const emailInput = document.getElementById('clerkEmail');
            const passwordInput = document.getElementById('clerkPassword');
            const emailError = document.getElementById('clerkEmailError');
            const passwordError = document.getElementById('clerkPasswordError');
            const successMessage = document.getElementById('clerkSuccessMessage');
            const loadingIndicator = document.getElementById('clerkLoading');
            const submitButton = document.getElementById('clerkSubmitBtn');
            const signUpLink = document.getElementById('clerkSignUpLink');
            const forgotPasswordLink = document.getElementById('clerkForgotPassword');
            const googleOAuthBtn = document.getElementById('google-oauth');
            const githubOAuthBtn = document.getElementById('github-oauth');

            // Initialize Clerk (this would normally be replaced with actual Clerk.js initialization)
            initializeClerk();

            // Form event listeners
            emailInput.addEventListener('blur', validateClerkEmail);
            passwordInput.addEventListener('blur', validateClerkPassword);
            signInForm.addEventListener('submit', handleClerkSignIn);
            signUpLink.addEventListener('click', handleSignUpNavigation);
            forgotPasswordLink.addEventListener('click', handleForgotPasswordNavigation);
            googleOAuthBtn.addEventListener('click', handleGoogleOAuth);
            githubOAuthBtn.addEventListener('click', handleGitHubOAuth);

            function initializeClerk() {
                // In a real implementation, you would initialize Clerk here
                console.log('Clerk initialization would happen here');
            }

            function validateClerkEmail() {
                const email = emailInput.value.trim();
                if (!email) {
                    showClerkError(emailError, 'Email is required');
                    return false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showClerkError(emailError, 'Please enter a valid email address');
                    return false;
                }
                clearClerkError(emailError);
                return true;
            }

            function validateClerkPassword() {
                const password = passwordInput.value;
                if (!password) {
                    showClerkError(passwordError, 'Password is required');
                    return false;
                }
                if (password.length < 8) {
                    showClerkError(passwordError, 'Password must be at least 8 characters');
                    return false;
                }
                clearClerkError(passwordError);
                return true;
            }

            async function handleClerkSignIn(e) {
                e.preventDefault();
                const isEmailValid = validateClerkEmail();
                const isPasswordValid = validateClerkPassword();
                if (!isEmailValid || !isPasswordValid) {
                    return;
                }
                try {
                    showClerkLoading();
                    // Simulate Clerk sign-in
                    const result = await simulateClerkSignIn({
                        email: emailInput.value.trim(),
                        password: passwordInput.value
                    });
                    if (result.status === 'complete') {
                        showClerkSuccess('Sign in successful! Redirecting...');
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1500);
                    } else {
                        handleClerkAdditionalSteps(result);
                    }
                } catch (error) {
                    handleClerkError(error);
                } finally {
                    hideClerkLoading();
                }
            }

            function handleClerkAdditionalSteps(result) {
                showClerkError(passwordError, 'Additional verification required');
            }

            function handleClerkError(error) {
                console.error('Clerk sign-in error:', error);
                let errorMessage = 'An error occurred during sign in';
                if (error.errors && error.errors[0]) {
                    errorMessage = error.errors[0].message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                showClerkError(passwordError, errorMessage);
            }

            function handleGlobalError(event) {
                console.error('Global error:', event.error);
                showFatalErrorFallback();
                event.preventDefault();
            }

            function handleGlobalPromiseRejection(event) {
                console.error('Unhandled rejection:', event.reason);
                showFatalErrorFallback();
                event.preventDefault();
            }

            function showFatalErrorFallback() {
                var mainContainer = document.querySelector('.clerk-container');
                if (mainContainer) mainContainer.style
                                if (mainContainer) mainContainer.style.display = 'none';
                var fallback = document.getElementById('fatalErrorFallback');
                if (fallback) fallback.style.display = 'block';
            }

            function handleSignUpNavigation(e) {
                e.preventDefault();
                window.location.href = '/sign-up';
            }

            function handleForgotPasswordNavigation(e) {
                e.preventDefault();
                window.location.href = '/forgot-password';
            }

            function handleGoogleOAuth() {
                simulateClerkOAuth('google');
            }

            function handleGitHubOAuth() {
                simulateClerkOAuth('github');
            }

            // UI helpers
            function showClerkError(element, message) {
                element.textContent = message;
                element.style.display = 'block';
            }

            function clearClerkError(element) {
                element.textContent = '';
                element.style.display = 'none';
            }

            function showClerkLoading() {
                submitButton.disabled = true;
                loadingIndicator.style.display = 'block';
            }

            function hideClerkLoading() {
                submitButton.disabled = false;
                loadingIndicator.style.display = 'none';
            }

            function showClerkSuccess(message) {
                successMessage.textContent = message;
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }

            // Simulation functions (replace with actual Clerk implementation)
            async function simulateClerkSignIn(credentials) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (credentials.email === 'test@example.com' && credentials.password === 'ClerkSecure123!') {
                    return {
                        status: 'complete',
                        createdSessionId: 'simulated_session_id_123',
                        user: {
                            id: 'user_123',
                            email: credentials.email,
                            firstName: 'Test',
                            lastName: 'User'
                        }
                    };
                }
                if (credentials.email === 'mfa@example.com') {
                    return {
                        status: 'needs_second_factor',
                        supportedStrategies: ['totp', 'phone_code']
                    };
                }
                throw {
                    errors: [
                        {
                            code: 'form_identifier_not_found',
                            message: 'Couldn\'t find your account'
                        }
                    ]
                };
            }

            async function simulateClerkOAuth(provider) {
                showClerkLoading();
                try {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    showClerkSuccess(`Signed in with ${provider}`);
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 1000);
                } catch (error) {
                    showClerkError(passwordError, `Failed to sign in with ${provider}`);
                } finally {
                    hideClerkLoading();
                }
            }
        });
    } catch (err) {
        // Failsafe: If anything in the script throws, show the fallback error UI
        var mainContainer = document.querySelector('.clerk-container');
        if (mainContainer) mainContainer.style.display = 'none';
        var fallback = document.getElementById('fatalErrorFallback');
        if (fallback) fallback.style.display = 'block';
        console.error('Fatal synchronous error:', err);
    }
    </script>
</body>
</html>