import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { email, logout } = useContext(AuthContext);
  const studentEmail = email.replace("@iiitn.ac.in", "");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // First, clear the auth state
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  };

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("hasSubmitted")
        .eq("student_id", studentEmail)
        .single();

      if (error) {
        console.error("Error checking submission status:", error);
      } else {
        setHasSubmitted(data?.hasSubmitted);
      }
    };

    if (studentEmail) {
      checkSubmissionStatus();
    }
  }, [studentEmail]);

  const handleRegisterClick = () => {
    navigate("/student/registration");
  };

  const handleBotClick = () => {
    navigate("/student/bot");
  };

  const RegisterButton = hasSubmitted ? (
    <div></div>
  ) : (
    <button
      className="p-2 bg-nebula-pink text-white hover:bg-opacity-80 transition duration-200 rounded-md"
      onClick={handleRegisterClick}
    >
      Register
    </button>
  );

  return (
    <nav className="bg-space-200 bg-opacity-80 text-starlight p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 backdrop-blur-md">
      <h1 className="text-xl font-bold font-space">
        {email ? `${email}` : ""}
      </h1>
      <div className="flex space-x-4">
        {RegisterButton}
        <button
          className="p-2 bg-nebula-blue text-white hover:bg-opacity-80 transition duration-200 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="p-2 bg-nebula-purple text-white hover:bg-opacity-80 transition duration-200 rounded-md"
          onClick={handleBotClick}
        >
          GO to Bot
        </button>
      </div>
    </nav>
  );
}
