import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, TrendingUp, ShieldCheck, Map, Award, FolderGit2, MousePointer, Calendar, Heart } from 'lucide-react';

const AnimatedFeatures = () => {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', label: 'Key Features', icon: Star },
    { id: 'innovation', label: 'Innovation', icon: Zap },
    { id: 'impact', label: 'Impact', icon: TrendingUp },
  ];

  const content = {
    features: [
      {
        title: "Personalized Roadmap",
        desc: "Tailored step-by-step learning path based on your specific background.",
        icon: Map,
        color: "bg-teal-100 text-teal-600"
      },
      {
        title: "Readiness Score",
        desc: "Dynamic score that tracks your progress for job applications.",
        icon: Award,
        color: "bg-purple-100 text-purple-600"
      },
      {
        title: "Project-Based",
        desc: "Recommendations for real-world projects to build a portfolio.",
        icon: FolderGit2,
        color: "bg-blue-100 text-blue-600"
      },
      {
        title: "Weekly Planning",
        desc: "Breaks down long-term goals into manageable weekly tasks.",
        icon: Calendar,
        color: "bg-green-100 text-green-600"
      }
    ],
    innovation: [
      {
        title: "Hybrid Approach",
        desc: "Combines rule-based logic with AI for reliability and intelligence.",
        icon: ShieldCheck,
        color: "bg-indigo-100 text-indigo-600"
      },
      {
        title: "Diploma Focus",
        desc: "Specifically designed for beginners and diploma students.",
        icon: UserIcon, // defined below
        color: "bg-orange-100 text-orange-600"
      },
      {
        title: "Cost-Effective",
        desc: "Built with common tech to be affordable and scalable.",
        icon: DollarIcon, // defined below
        color: "bg-teal-100 text-teal-600"
      }
    ],
    impact: [
      {
        title: "Employability",
        desc: "Increases interview call rates by ~65%.",
        icon: BriefcaseIcon, // defined below
        color: "bg-blue-100 text-blue-800"
      },
      {
        title: "Clarity",
        desc: "Students report 80% more clarity in career direction.",
        icon: HelpIcon, // defined below
        color: "bg-teal-100 text-teal-600"
      },
      {
        title: "Confidence",
        desc: "Real stories from 10K+ students helped.",
        icon: Heart,
        color: "bg-red-100 text-red-600"
      }
    ]
  };

  return (
    <div className="py-12 bg-gray-50 rounded-3xl my-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Discover Mr. Pathfinder</h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {content[activeTab].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Helper Icons
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const DollarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const BriefcaseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const HelpIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);

export default AnimatedFeatures;
