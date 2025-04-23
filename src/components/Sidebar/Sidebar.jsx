import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileSearch,
  Link2,
  MessageSquare,
  Clock,
  UserCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setUsername(decodedToken.username);
    }
  }, []);
  

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return {};
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/uploadfiles", label: "New Case", icon: <FileSearch size={20} /> },
    { to: "/caseshistory", label: "Cases History", icon: <Link2 size={20} /> },
    // { to: "/chat-assistant", label: "Chat Assistant", icon: <MessageSquare size={20} /> },
    // { to: "/timeline", label: "Timeline", icon: <Clock size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-[#00234E] text-white fixed h-full shadow-lg z-20">
        {/* Logo */}
        <div className="flex items-center p-5 border-b border-[#003973]">
          <img
            src="https://images.seeklogo.com/logo-png/61/1/gujarat-police-logo-png_seeklogo-611297.png"
            alt="Logo"
            className="h-10 w-10 mr-4"
          />
          <h1 className="text-lg font-bold">404 Not Found(Yet)</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6 px-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-all font-medium ${
                  isActive
                    ? "bg-white text-[#00234E]"
                    : "hover:bg-[#004b9f] text-white"
                }`
              }
              end={to === "/dashboard"}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-72 w-full">
        {/* Navbar */}
        <header className="fixed top-0 left-72 right-0 bg-[#00234E] border-b border-[#003973] p-4 shadow-md z-10 flex items-center justify-between h-16">
  <div className="text-xl font-semibold text-white"></div>

  {/* Profile Dropdown */}
  <div className="relative">
    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-2 bg-transparent hover:bg-[#003973] text-white px-3 py-2 rounded-full border border-white"
    >
      <div className="bg-white p-1 rounded-full">
        <UserCircle size={24} className="text-[#00234E]" />
      </div>
      {username && <span className="hidden sm:inline">{username}</span>}
    </button>

    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-2 border-b">Hello, {username}</div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    )}
  </div>
</header>


        {/* Children */}
        <div className="p-6 mt-20">{children}</div>
      </main>
    </div>
  );
}
