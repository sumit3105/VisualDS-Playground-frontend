import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "./Header"; // Adjust path as needed
import { toast } from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordVisible: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePassword = () =>
    setForm((prev) => ({ ...prev, passwordVisible: !prev.passwordVisible }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);

    if (res.success) {
      toast.success("Login Successed");
      navigate(`/dashboard`);
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
      <Header child="login" />

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Login to Your Account
          </h2>

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                name="password"
                type={form.passwordVisible ? "text" : "password"}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600 transition"
              >
                {form.passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
