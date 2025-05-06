import { useState } from "react";
import { User, Mail, Key, Save } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    confirmPassword: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      {/* Header with proper alignment */}
      <div className="flex items-center mb-6">
        {/* Left-aligned Back button */}
        <div className="flex-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black hover:text-indigo-600 transition"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        
        {/* Centered Profile title */}
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
        
        {/* Right-aligned Edit button */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md ${isEditing ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'} transition-colors`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
      
      {/* Rest of the profile form remains the same */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
          <User size={48} className="text-indigo-600" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`flex-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-r-md ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
              />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`flex-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-r-md ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
              />
            </div>
          </div>
          
          {isEditing && (
            <>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="flex">
                  <div className="flex items-center justify-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                    <Key size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleInputChange}
                    className="flex-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-r-md"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="flex">
                  <div className="flex items-center justify-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                    <Key size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleInputChange}
                    className="flex-1 block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-r-md"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        {isEditing && (
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}