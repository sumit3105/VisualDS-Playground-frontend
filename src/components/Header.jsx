import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { logout } from "../services/authService";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex-1 flex justify-center">
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
          VisualDS-Playground
        </Link>
      </div>
      
      <div className="relative">
        <button
          onClick={toggleProfile}
          className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={18} className="text-indigo-600" />
          </div>
          <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link 
              to="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 flex items-center"
              onClick={() => setIsProfileOpen(false)}
            >
              <User size={16} className="mr-2" />
              View Profile
            </Link>
            <Link 
              to="/login" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 flex items-center"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}