import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedbackSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-16 px-4 bg-indigo-900 text-white rounded-t-3xl mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <MessageSquare size={32} className="text-teal-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We Value Your Feedback</h2>
          <p className="text-indigo-200 text-lg">Help us improve Mr. Pathfinder for future students.</p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-gray-800 rounded-2xl p-12 text-center shadow-xl max-w-lg mx-auto"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">Your feedback has been received. We appreciate your contribution to our roadmap.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-indigo-600 font-semibold hover:text-indigo-800"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl max-w-2xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/10 border border-indigo-400/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-indigo-200 text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/10 border border-indigo-400/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-indigo-200 text-sm font-medium mb-2">Your Message</label>
              <textarea 
                required
                rows="4"
                className="w-full bg-white/10 border border-indigo-400/30 rounded-lg px-4 py-3 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
                placeholder="Tell us what you think or suggest a feature..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              Send Feedback <Send size={20} />
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
