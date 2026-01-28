import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TrendingTicker from '../components/TrendingTicker';

// Import New Animated Components
import AnimatedFeatures from '../components/landing/AnimatedFeatures';
import FeedbackSection from '../components/landing/FeedbackSection';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="-mx-4 -mt-8 mb-8">
        <TrendingTicker />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight max-w-5xl">
          AI-Powered Career Guidance <br />
          <span className="text-indigo-600">Mr. Pathfinder</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
          Generate personalized, actionable career roadmaps. Track your internship readiness score and get noticed by top recruiters.
          <br/>
          <span className="text-sm font-semibold text-teal-600 mt-2 block">From Confusion to Clarity in Minutes.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/auth" className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Free <ArrowRight size={20} />
          </Link>
          <Link to="/hr-dashboard" className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition shadow-sm hover:shadow-md">
            For Recruiters
          </Link>
        </div>
      </div>

      {/* Animated Tabs Section (Replaces long scroll) */}
      <AnimatedFeatures />

      {/* Feedback Section (Footer Replacement) */}
      <FeedbackSection />
    </div>
  );
};

export default Landing;
