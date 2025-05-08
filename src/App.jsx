import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/Homepage";
import AutoLoginPage from "./components/auth/AutoLogin";
import Toast from "./components/Toast";

function App() {
  return (
      <Router basename="/VisualDS-Playground-frontend">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthRoute><Login/></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup/></AuthRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/playground" element={<PrivateRoute><Playground/></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
          <Route path="/autologin" element={<AutoLoginPage />} />
        </Routes>
        <Toast />
      </Router>
  );
}

export default App;
