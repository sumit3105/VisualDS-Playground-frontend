// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import LoanRequests from "./pages/LoanRequests";
// import ActiveLoans from "./pages/ActiveLoans";
// import FundsManagement from "./pages/FundsManagement";

// function App() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Mock user data
//   const [userData, setUserData] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     profileImage: "/placeholder.svg?height=200&width=200",
//     worth: 50000,
//     isActive: true,
//   });

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <Dashboard userData={userData} />;
//       case "profile":
//         return <Profile userData={userData} setUserData={setUserData} />;
//       case "loan-requests":
//         return <LoanRequests />;
//       case "active-loans":
//         return <ActiveLoans />;
//       case "funds":
//         return (
//           <FundsManagement userData={userData} setUserData={setUserData} />
//         );
//       default:
//         return <Dashboard userData={userData} />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//         isOpen={sidebarOpen}
//       />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header
//           userData={userData}
//           setSidebarOpen={setSidebarOpen}
//           sidebarOpen={sidebarOpen}
//           setActivePage={setActivePage}
//         />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoute from "./routes/AuthRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<AuthRoute><Login/></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup/></AuthRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
