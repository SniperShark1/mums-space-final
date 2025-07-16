import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useClerk } from '@clerk/clerk-react'; // Import useUser and useClerk

const StripePayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSignedIn, isLoaded: isClerkLoaded } = useUser(); // Get Clerk user state
  const { signOut: clerkSignOut } = useClerk(); // Get Clerk's signOut function
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const plans = {
    monthly: { name: 'Monthly', price: 4, interval: 'month' },
    yearly: { name: 'Yearly', price: 40, interval: 'year' }
  };

  // --- AUTHENTICATION CHECK ---
  useEffect(() => {
    // Wait for Clerk to load before checking authentication
    if (!isClerkLoaded) {
      console.log("StripePayment: Clerk not loaded yet.");
      return;
    }

    const checkAuth = async () => {
      console.log("StripePayment: Checking authentication state...");
      if (!isSignedIn) {
        console.log("StripePayment: User is NOT signed in via Clerk. Redirecting to /welcome.");
        navigate('/welcome'); // Redirect if not signed in via Clerk
        return;
      }
      console.log("StripePayment: User IS signed in via Clerk.");

      // Optional: If you need a Supabase session for backend functions,
      // you might need to exchange Clerk's session token for a Supabase one here.
      // For now, we'll assume Clerk's isSignedIn is sufficient for UI access.
      const { data: { session: supabaseSession }, error: supabaseError } = await supabase.auth.getSession();
      if (supabaseError) {
        console.error("StripePayment: Error getting Supabase session:", supabaseError);
      }
      if (!supabaseSession) {
        console.warn("StripePayment: No Supabase session found, but user is signed in via Clerk. This might be expected if Supabase auth is not directly linked to Clerk auth on the frontend.");
        // If your backend functions *require* a Supabase session, you'd need to
        // implement a way to create/refresh it here using Clerk's session.
      } else {
        console.log("StripePayment: Supabase session also found.");
      }
    };
    checkAuth();
  }, [isClerkLoaded, isSignedIn, navigate]); // Depend on Clerk's loaded and signedIn state

  // Reset promo code and discount when switching to monthly
  useEffect(() => {
    if (selectedPlan === 'monthly') {
      setPromoCode('');
      setDiscount(0);
    }
  }, [selectedPlan]);

  const calculateTotal = () => {
    const basePrice = plans[selectedPlan as keyof typeof plans].price;
    return Math.max(0, basePrice - discount);
  };

  const applyPromoCode = () => {
    // Only apply promo code for yearly plan
    if (selectedPlan !== 'yearly') {
      toast({
        title: "Promo code not available",
        description: "Promo codes are only available for yearly subscriptions.",
        variant: "destructive"
      });
      return;
    }

    // Simple promo code logic - $5 off yearly plan
    if (promoCode.toLowerCase() === 'welcome5') {
      setDiscount(5);
      toast({
        title: "Promo code applied!",
        description: "You've received a $5 AUD discount!",
      });
    } else if (promoCode) {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Ensure user is signed in via Clerk before attempting payment
      if (!isSignedIn) {
        throw new Error('User is not authenticated. Please sign in.');
      }

      // If your Supabase function 'create-checkout' requires a Supabase session,
      // you might need to pass Clerk's session token or ensure a Supabase session
      // is established before this call.
      // For now, we'll proceed assuming the backend handles auth validation.

      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceType: selectedPlan,
          promoCode: promoCode || null,
          discount: discount
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipPayment = async () => {
    // Sign out the user from Clerk (primary auth)
    try {
      console.log("StripePayment: Skipping payment and signing out from Clerk.");
      await clerkSignOut(() => navigate('/sign-in')); // Use Clerk's signOut and redirect to /sign-in
    } catch (error) {
      console.error('Error during Clerk sign out:', error);
      navigate('/sign-in'); // Fallback redirect
    }
  };

  // Show loading or a placeholder while Clerk is loading
  if (!isClerkLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: "url('/lovable-uploads/55463752-767b-400e-a8f4-11212a9a82f4.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div className="text-[#8E294F] font-bodoni text-xl">Loading payment options...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/lovable-uploads/55463752-767b-400e-a8f4-11212a9a82f4.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-md w-full">
        <div className="bg-soft-pink/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/3910644d-e8f9-46ef-a7e8-59449d817ec9.png" 
              alt="Mum's Space Logo" 
              className="w-[200px] h-auto" 
            />
          </div>
          
          <h1 className="text-3xl font-bodoni font-bold text-[#8E294F] text-center mb-2">
            Choose Your Plan
          </h1>
          <p className="text-[#8E294F] font-bodoni text-center mb-6">
            Select your subscription and complete payment
          </p>
          
          <div className="space-y-6">
            {/* Plan Selection */}
            <div>
              <Label className="text-[#8E294F] font-bodoni font-medium text-sm mb-3 block">
                Choose Your Plan
              </Label>
              <div className="space-y-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={key}
                      name="plan"
                      value={key}
                      checked={selectedPlan === key}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-4 h-4 text-[#F7C9C7] focus:ring-[#F7C9C7]"
                    />
                    <label 
                      htmlFor={key} 
                      className="flex-1 flex justify-between items-center text-[#8E294F] font-bodoni cursor-pointer"
                    >
                      <span>{plan.name}</span>
                      <span className="font-bold">${plan.price} AUD</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code - Only show for yearly plan */}
            {selectedPlan === 'yearly' && (
              <div>
                <Label className="text-[#8E294F] font-bodoni font-medium text-sm">
                  Promo Code (Optional)
                </Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-white/90 border-white text-[#8E294F] placeholder:text-[#8E294F]/60 focus:bg-white font-bodoni"
                    placeholder="Enter promo code"
                  />
                  <Button
                    type="button"
                    onClick={applyPromoCode}
                    className="bg-[#F7C9C7] hover:bg-[#F7C9C7]/80 text-[#8E294F] font-bodoni px-4"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white/50 rounded-lg p-4 border border-white/30">
              <h3 className="text-[#8E294F] font-bodoni font-bold text-lg mb-3">Order Summary</h3>
              <div className="space-y-2 text-[#8E294F] font-bodoni">
                <div className="flex justify-between">
                  <span>{plans[selectedPlan as keyof typeof plans].name} Plan</span>
                  <span>${plans[selectedPlan as keyof typeof plans].price} AUD</span>
                </div>
                {discount > 0 && selectedPlan === 'yearly' && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-${discount} AUD</span>
                  </div>
                )}
                <hr className="border-white/30" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()} AUD</span>
                </div>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full h-12 rounded-full font-bodoni text-lg bg-[#F7C9C7] hover:bg-[#F7C9C7]/80 text-[#8E294F] border-2 border-white font-bold"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </Button>

              <Button
                onClick={handleSkipPayment}
                variant="outline"
                className="w-full h-12 rounded-full font-bodoni text-lg bg-transparent hover:bg-white/20 text-[#8E294F] border-2 border-white"
              >
                Skip Payment & Sign In
              </Button>
            </div>

            {/* Payment Info */}
            <p className="text-center text-xs text-[#8E294F]/70 font-bodoni">
              Secure payment powered by Stripe. Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;