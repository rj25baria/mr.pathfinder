import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true });
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">Mr. Pathfinder</Link>
        <div className="space-x-6 font-medium">
          <Link to="/dashboard" className="hover:text-indigo-200 transition">Student Dashboard</Link>
          <Link to="/hr-dashboard" className="hover:text-indigo-200 transition">HR Portal</Link>
          <Link to="/auth" className="hover:text-indigo-200 transition">Login</Link>
          <button onClick={handleLogout} className="bg-indigo-700 px-4 py-2 rounded hover:bg-indigo-800 transition">Logout</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
