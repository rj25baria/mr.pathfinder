import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { INTEREST_OPTIONS } from '../data/constants';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up as per user flow
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    education: '10th Pass', // Default
    interests: 'Artificial Intelligence',
    careerGoal: '',
    role: 'student',
    consent: false,
    captchaAnswer: ''
  });

  // Captcha State
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });

  useEffect(() => {
    generateCaptcha();
  }, [isLogin]);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setFormData(prev => ({ ...prev, captchaAnswer: '' }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client Validation
    if (formData.password.length < 6) {
        return toast.error('Password must be at least 6 characters');
    }

    if (!isLogin) {
        if (!formData.name || !formData.phone || !formData.dateOfBirth) {
            return toast.error('Please fill in all required fields');
        }
        if (formData.phone.length !== 10) {
            return toast.error('Phone number must be 10 digits');
        }
        if (!formData.consent) {
            return toast.error('You must agree to the Terms and Conditions');
        }
        if (parseInt(formData.captchaAnswer) !== captcha.a) {
            toast.error('Incorrect Security Answer. Try again.');
            generateCaptcha();
            return;
        }
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const toastId = toast.loading(isLogin ? 'Logging in...' : 'Creating Account...');

    try {
        const res = await api.post(endpoint, formData);
        
        if (res.data.success) {
            toast.success(isLogin ? 'Welcome Back!' : 'Account Created Successfully!', { id: toastId });
            
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
            }

            // Navigation
            setTimeout(() => {
                if (res.data.user.role === 'hr') navigate('/hr-dashboard');
                else navigate('/dashboard');
            }, 1000);
        }
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Connection Error', { id: toastId });
        if (!isLogin) generateCaptcha();
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">
                    {isLogin ? 'Welcome Back' : 'Join Mr. Pathfinder'}
                </h1>
                <p className="text-gray-500">
                    {isLogin ? 'Access your dashboard' : 'Start your career journey today'}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-md font-semibold text-sm transition ${isLogin ? 'bg-white text-indigo-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-md font-semibold text-sm transition ${!isLogin ? 'bg-white text-indigo-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* GLOBAL FIELDS */}
                {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                            <input 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="e.g. Rahul Sharma"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date of Birth</label>
                            <input 
                                name="dateOfBirth" 
                                type="date"
                                value={formData.dateOfBirth} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                            >
                                <option value="student">Student</option>
                                <option value="hr">HR / Recruiter</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* LOGIN / EMAIL */}
                <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                     <input 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                {/* STUDENT SPECIFIC FIELDS (SIGNUP ONLY) */}
                {!isLogin && formData.role === 'student' && (
                    <div className="space-y-4 pt-2 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Number</label>
                                <input 
                                    name="phone" 
                                    type="tel"
                                    value={formData.phone} 
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="10-digit mobile"
                                    maxLength={10}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Course Selection</label>
                                <select 
                                    name="education" 
                                    value={formData.education} 
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                >
                                    <option value="10th Pass">10th Pass</option>
                                    <option value="12th Pass">12th Pass</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Post Graduate">Post Graduate</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Primary Interest</label>
                            <select 
                                name="interests" 
                                value={formData.interests} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                            >
                                {INTEREST_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Career Goal</label>
                            <input 
                                name="careerGoal" 
                                value={formData.careerGoal} 
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                placeholder="e.g. AI Researcher"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* PASSWORD */}
                 <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                     <input 
                        name="password" 
                        type="password"
                        value={formData.password} 
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {/* SECURITY & CONSENT (SIGNUP ONLY) */}
                {!isLogin && (
                    <div className="bg-indigo-50 p-4 rounded-xl space-y-3">
                         <div className="flex items-center gap-3">
                            <span className="font-bold text-indigo-900 bg-white px-3 py-1 rounded border border-indigo-100">
                                {captcha.q} = ?
                            </span>
                            <input 
                                name="captchaAnswer" 
                                type="number"
                                value={formData.captchaAnswer} 
                                onChange={handleChange}
                                className="w-24 p-2 border border-indigo-200 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold"
                                placeholder="Ans"
                                required
                            />
                            <span className="text-xs text-indigo-600 font-medium">Solve to verify you are human</span>
                         </div>

                         <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-indigo-300 shadow transition-all checked:border-indigo-600 checked:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    required
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </div>
                             <span className="text-sm text-gray-600 group-hover:text-indigo-800 transition">
                                 I agree to the <a href="#" className="font-bold underline decoration-indigo-300">Terms and Conditions</a> and consent to the processing of my personal data.
                             </span>
                         </label>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                             <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                             Processing...
                        </span>
                    ) : (isLogin ? 'Login to Dashboard' : 'Create My Account')}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Auth;
