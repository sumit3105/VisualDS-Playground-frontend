import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, ChevronDown, Github, BookOpen } from "lucide-react";
import { logout, getToken } from "../services/authService";
import { toast } from "react-hot-toast";
import { getProfile } from "../services/userService";

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = Boolean(getToken());

    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    useEffect(() => {
        if (isAuth) {
            (async () => {
                const user = await getProfile();
                setUser(user);
            })();
        }
    }, [isAuth]);

    const toggleProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };

    const handleLogout = () => {
        toast.success("Logged out");
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
                VisualDS-Playground
            </Link>

            {isAuth && !isAuthPage ? (
                <nav className="flex items-center gap-6">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Explore
                    </Link>
                    <Link
                        to="https://zalaharshpalsinh.github.io/VisualDS/docs/enduser/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1"
                    >
                        <BookOpen size={16} />
                        Documentation
                    </Link>
                    <Link
                        to="https://github.com/ZalaHarshpalsinh/VisualDS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1"
                    >
                        <Github size={16} />
                        GitHub
                    </Link>
                </nav>
            ) : null}

            {isAuthPage ? (
                <nav className="flex items-center gap-4">
                    {location.pathname !== "/login" && (
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Login
                        </Link>
                    )}
                    {location.pathname !== "/signup" && (
                        <Link
                            to="/signup"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Signup
                        </Link>
                    )}
                </nav>
            ) : isAuth ? (
                <div className="relative">
                    <button
                        onClick={toggleProfile}
                        className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
                            <img
                                src={
                                    user.imageUrl ||
                                    `https://ui-avatars.com/api/?name=${user.name}`
                                }
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                                isProfileOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link
                                to="/profile"
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 flex items-center"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                <User size={16} className="mr-2" />
                                View Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 flex items-center"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : null}
        </header>
    );
}