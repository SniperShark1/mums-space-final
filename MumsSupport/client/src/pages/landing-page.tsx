import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Smile, Heart, Shield, Users, Calendar, MapPin } from 'lucide-react';
import logoImage from '../assets/logo.png';

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-white">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logoImage} alt="Mum's Space Logo" className="h-12" />
          <h1 className="text-2xl font-quicksand font-bold text-pink-700 ml-2">Mum's Space</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/auth?tab=login")}
            className="border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50"
          >
            Sign In
          </Button>
          <Button 
            size="sm" 
            onClick={() => navigate("/auth?tab=register")}
            className="bg-pink-soft hover:bg-pink-600"
          >
            Join Now
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-20 md:px-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-quicksand font-bold text-gray-800 mb-4"
          >
            Welcome to <span className="text-pink-soft">Mum's Space</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 mb-6"
          >
            A compassionate digital platform supporting mothers through community connection, 
            emotional sharing, and resource discovery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/auth?tab=register")}
              className="bg-pink-soft hover:bg-pink-600 text-white px-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/auth?tab=login")}
              className="border-pink-200 text-pink-700 px-8"
            >
              I'm Already a Member
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 relative"
        >
          <div className="w-full h-[400px] bg-gradient-pink-blue rounded-xl overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
              <h3 className="text-2xl font-quicksand font-bold mb-6">Join thousands of mothers supporting each other</h3>
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <Heart className="h-8 w-8 mb-2 mx-auto text-white" />
                  <p className="text-sm">Emotional Support</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <Users className="h-8 w-8 mb-2 mx-auto text-white" />
                  <p className="text-sm">Age-Specific Groups</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <Shield className="h-8 w-8 mb-2 mx-auto text-white" />
                  <p className="text-sm">Safe Community</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <MapPin className="h-8 w-8 mb-2 mx-auto text-white" />
                  <p className="text-sm">Local Resources</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-quicksand font-bold text-center text-gray-800 mb-12">
            Supporting Your Motherhood Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-pink-soft" />}
              title="Age-Specific Community Circles"
              description="Connect with other mothers going through the same stage of parenthood as you, from newborns to adult children."
            />
            <FeatureCard 
              icon={<Heart className="h-10 w-10 text-pink-soft" />}
              title="Emotional Support Network"
              description="Share your struggles and victories in a judgment-free zone where other mothers understand exactly what you're going through."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-pink-soft" />}
              title="Verified-User Community"
              description="Our verification process ensures a safe, supportive environment free from trolls and negativity."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-quicksand font-bold text-gray-800 mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 mb-8">
            Sign up today and connect with other mothers who understand your journey.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth?tab=register")}
            className="bg-pink-soft hover:bg-pink-600 text-white px-8"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logoImage} alt="Mum's Space Logo" className="h-8" />
              <h3 className="text-lg font-quicksand font-bold text-pink-700 ml-2">Mum's Space</h3>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Mum's Space. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-sm border border-pink-100"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-quicksand font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}