import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Target, Award } from 'lucide-react';
import TrendingTicker from '../components/TrendingTicker';

const Landing = () => {
  return (
    <div className="flex flex-col">
      <div className="-mx-4 -mt-8 mb-8">
        <TrendingTicker />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <h1 className="text-5xl font-extrabold text-indigo-900 leading-tight max-w-4xl">
        AI-Powered Career Guidance <br />
        <span className="text-indigo-600">Mr. Pathfinder</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl">
        Generate personalized, actionable career roadmaps. Track your internship readiness score and get noticed by top recruiters.
      </p>
      
      <div className="flex gap-4">
        <Link to="/auth" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition flex items-center gap-2">
          Get Started <ArrowRight size={20} />
        </Link>
        <Link to="/hr-dashboard" className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-indigo-50 transition">
          For Recruiters
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="bg-indigo-100 p-3 rounded-full w-fit mb-4 mx-auto text-indigo-600">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Roadmaps</h3>
          <p className="text-gray-600">Tailored learning paths based on your skills and goals.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="bg-green-100 p-3 rounded-full w-fit mb-4 mx-auto text-green-600">
            <Target size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Project Recommendations</h3>
          <p className="text-gray-600">Build real-world projects to boost your portfolio.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="bg-purple-100 p-3 rounded-full w-fit mb-4 mx-auto text-purple-600">
            <Award size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Readiness Score</h3>
          <p className="text-gray-600">Track your progress and readiness for internships.</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Landing;
