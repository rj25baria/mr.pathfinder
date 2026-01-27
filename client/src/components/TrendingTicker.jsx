import { motion } from 'framer-motion';

const TrendingTicker = () => {
  const trends = [
    "🔥 Trending: AI & Machine Learning",
    "🚀 Hot: Full Stack Development with React",
    "💡 Idea: Sustainable Energy IoT Solutions",
    "📈 Popular: Data Science & Analytics",
    "🛡️ Security: Cybersecurity Essentials",
    "🤖 Future: Robotics & Automation"
  ];

  return (
    <div className="bg-indigo-900 text-white py-2 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-indigo-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-900 to-transparent z-10"></div>
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {[...trends, ...trends, ...trends].map((trend, index) => (
          <span key={index} className="mx-8 font-medium flex items-center">
            {trend}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TrendingTicker;
