import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Authcontext';
import supabase from '../../config/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function FacultyDashboard() {
  const { email, logout } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  useEffect(() => {
    const fetchFacultyData = async () => {
      const { data: facultyData, error: facultyError } = await supabase
        .from('faculties')
        .select('faculty_id, faculty_name')
        .eq('gmail', email);

      if (facultyError) {
        console.error('Error fetching faculty data:', facultyError.message);
        return;
      }

      if (facultyData && facultyData.length > 0) {
        const { faculty_id: facultyId, faculty_name } = facultyData[0];
        setName(faculty_name);

        if (facultyId !== undefined && typeof facultyId === 'number') {
          const { data: coursesData, error: coursesError } = await supabase
            .from('courses')
            .select('*')
            .eq('faculty', facultyId);

          if (coursesError) {
            console.error('Error fetching courses:', coursesError.message);
          } else if (coursesData) {
            console.log('Fetched courses:', coursesData);
            setCourses(coursesData);
          }
        } else {
          console.error('Faculty ID is undefined or not a number.');
        }
      } else {
        console.error('No faculty data found for the provided email.');
      }
    };

    fetchFacultyData();
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 rounded-md shadow-md">
        <h1 className="text-xl font-bold">
          Welcome, Professor <span className="capitalize">{name}</span>
        </h1>
        <button
          onClick={handlelogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md shadow text-white"
        >
          Logout
        </button>
      </header>

      <main className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Your Courses:</h2>
        <ul className="mt-4 space-y-2">
          {courses.map((course, index) => (
            <li key={index}>
              <Link
                to={`/faculty/dashboard/${course.course_name}`}
                className="block bg-white hover:bg-blue-50 px-4 py-3 rounded-md shadow-md border border-gray-200"
              >
                {course.course_name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
