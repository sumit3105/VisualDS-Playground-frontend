import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../services/authService"; // your existing login API
import toast from "react-hot-toast";

const tokenUserMap = {
    [import.meta.env.VITE_GUEST_SECRET] : {
    email: import.meta.env.VITE_GUEST_EMAIL,
    password: import.meta.env.VITE_GUEST_PASSWORD
  }
};

export default function AutoLoginPage() {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (!token || !tokenUserMap[token]) {
      toast.error("Invalid access token.");
      return navigate("/login");
    }

    const { email, password } = tokenUserMap[token];

    (async () => {
      try {
        const res = await login(email, password); 
        if (res.success) {
          toast.success("Logged in successfully!");
          navigate("/dashboard"); // redirect to dashboard
        } else {
          toast.error("Login failed");
        }
      } catch (err) {
        toast.error("Auto-login error");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl text-gray-600 animate-pulse">Logging you in...</p>
    </div>
  );
}
