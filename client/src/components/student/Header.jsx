import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Authcontext';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { email, logout } = useContext(AuthContext);
  const studentEmail = email.replace('@iiitn.ac.in', '');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handlelogout = () => {
    logout();    // First, clear the auth state
    setTimeout(() => {
      navigate('/',{ replace: true });
    }, 0);
  }

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('hasSubmitted')
        .eq('student_id', studentEmail)
        .single();

      if (error) {
        console.error('Error checking submission status:', error);
      } else {
        setHasSubmitted(data?.hasSubmitted);
      }
    };

    if (studentEmail) {
      checkSubmissionStatus();
    }
  }, [studentEmail]);

  const handleRegisterClick = () => {
    navigate('/student/registration');
  };

  const Register = hasSubmitted ? (
    <div></div>
  ) : (
    <button className="p-2 bg-red-400" onClick={handleRegisterClick} style={{ cursor: 'pointer' }}>
      Register
    </button>
  );

  return (
    <div className="bg-blue-600 text-gray-200 p-4 text-lg">
      {Register}
      <h1>{email ? `${email}` : ''}</h1>
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
}
