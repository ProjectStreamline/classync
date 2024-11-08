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

  const openNoticeModal = () => setIsNoticeModalOpen(true);
  const closeNoticeModal = () => setIsNoticeModalOpen(false);

  return (
    <div className="bg-black text-white flex flex-col items-center m-8 p-4 rounded-xl sticky min-h-screen w-[18%]">
      {/* Name */}
      <div className="flex flex-col items-center mb-8">
        <div className="text-lg font-semibold text-heading">Dr. Nikhil</div>
        <div className="text-sm text-text">FA</div>
      </div>

      {/* Logo */}
      <div className="mb-8">
        <img
          src={iiitnLogo}
          className="object-contain h-24 w-24"
          alt="iiitn logo"
        />
      </div>

      {/* Nav Links */}
      <div className="flex flex-col items-center mb-8">
        <Link
          to={"/fa/dashboard"}
          className="w-full mb-3 hover:bg-gray-100 hover:text-black rounded-xl px-5 py-2 transition-all duration-500 hover:animate-pulse text-center"
        >
          Dashboard
        </Link>
        <Link
          to={"/fa/registration"}
          className="w-full mb-3 hover:bg-gray-100 hover:text-black rounded-xl px-5 py-2 transition-all duration-500 hover:animate-pulse text-center"
        >
          Registration
        </Link>
        <Link
          to={"/fa/generatenotice"}
          className="w-full mb-3 hover:bg-gray-100 hover:text-black rounded-xl px-5 py-2 transition-all duration-500 hover:animate-pulse text-center"
        >
          Generate Notice
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto mb-8">
        <div
          className="bg-white text-black rounded-full w-32 h-12 flex items-center justify-center hover:text-black hover:bg-blue-500 duration-500"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <div className="text-center text-sm mb-auto">&copy; 2024 IIITN ERP</div>

      {/* Notice Modal */}
      {isNoticeModalOpen && <NoticeModal onClose={closeNoticeModal} />}
    </div>
  );
};

export default FaNavbar;
