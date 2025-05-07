import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import { logout } from "../services/authService";
import { toast } from "react-hot-toast";
import { getProfile } from "../services/userService";
import { Button } from "../components/ui/Button";
import { Github, BookOpen } from "lucide-react";

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const user = await getProfile();
            setUser(user);
        })();
    }, []);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        toast.success("Logged out");
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex-1 flex justify-center">
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-indigo-600"
                >
                    VisualDS-Playground
                </Link>
            </div>

            <div className="mt-6 flex justify-start gap-4">
                <a
                    href="https://github.com/ZalaHarshpalsinh/VisualDS"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Github size={18} />
                        Github
                    </Button>
                </a>
                <a
                    href="https://zalaharshpalsinh.github.io/VisualDS/docs/enduser/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <BookOpen size={18} /> Documentation
                    </Button>
                </a>
            </div>

            <div className="relative">
                <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 focus:outline-none"
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
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 flex items-center"
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
