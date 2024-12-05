import { useState, useContext } from "react";
import iiitnLogo from "../../assets/iiitn.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import NoticeModal from "./NoticeModal";

const FaNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  };

  const closeNoticeModal = () => setIsNoticeModalOpen(false);

  return (
    <div className="bg-gray-900 text-white m-8 flex flex-col items-center p-6 rounded-xl sticky top-0 min-h-screen w-[18%] shadow-lg">
      {/* User Information */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="text-xl font-semibold text-gray-100">Dr. Nikhil</div>
        <div className="text-sm text-gray-400">Faculty Advisor</div>
      </div>

      {/* Logo */}
      <div className="mb-8">
        <img
          src={iiitnLogo}
          className="object-contain h-24 w-24"
          alt="IIITN Logo"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center mb-8 w-full">
        <Link
          to={"/fa/dashboard"}
          className="w-full mb-3 text-center text-lg font-medium bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-3 transition-all duration-300"
        >
          Dashboard
        </Link>
        <Link
          to={"/fa/registration"}
          className="w-full mb-3 text-center text-lg font-medium bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-3 transition-all duration-300"
        >
          Registration
        </Link>
        <Link
          to={"/fa/cgpa"}
          className="w-full mb-3 text-center text-lg font-medium bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-3 transition-all duration-300"
        >
          Grades
        </Link>
        <Link
          to={"/fa/generatenotice"}
          className="w-full mb-3 text-center text-lg font-medium bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-3 transition-all duration-300"
        >
          Generate Notice
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-auto mb-6">
        <button
          className="bg-blue-600 text-white font-bold rounded-full w-36 h-12 flex items-center justify-center hover:bg-blue-500 transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm mt-auto">
        &copy; 2024 IIITN ERP
      </div>

      {/* Notice Modal */}
      {isNoticeModalOpen && <NoticeModal onClose={closeNoticeModal} />}
    </div>
  );
};

export default FaNavbar;
