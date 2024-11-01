import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Authcontext';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function FacultyDashboard() {
    const { email ,logout} = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
      const navigate = useNavigate(); 

 const handlelogout = () => {
    logout();    // First, clear the auth state
    setTimeout(() => {
      navigate('/',{ replace: true });
    }, 0);
  }

    useEffect(() => {
        const fetchFacultyData = async () => {

            const { data: facultyData, error: facultyError } = await supabase
                .from('faculties')
                .select('faculty_id, faculty_name')
                .eq('gmail', email);

            if (facultyError) {
                console.error("Error fetching faculty data:", facultyError.message);
                return;
            }

            if (facultyData && facultyData.length > 0) {
                const { faculty_id: facultyId, faculty_name } = facultyData[0];
                setName(faculty_name);

                // Log the faculty ID to ensure it's a valid number
                console.log("Faculty ID:", facultyId);

                // Ensure facultyId is a number
                if (facultyId !== undefined && typeof facultyId === 'number') {
                    // Fetch courses linked to the faculty ID
                    const { data: coursesData, error: coursesError } = await supabase
                        .from('courses')
                        .select('*')
                        .eq('faculty', facultyId);

                    if (coursesError) {
                        console.error("Error fetching courses:", coursesError.message);
                    } else if (coursesData) {
                        console.log("Fetched courses:", coursesData); // Log courses data
                        setCourses(coursesData);
                    }
                } else {
                    console.error("Faculty ID is undefined or not a number.");
                }
            } else {
                console.error("No faculty data found for the provided email.");
            }
        };
        
        fetchFacultyData();
    }, [email]);

    return (
        <div>
            <h1>Welcome Professor {name}</h1>
            <button onClick={handlelogout} className='p-2 bg-slate-700'>Logout</button>
            <h2>Your Courses:</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        {course.course_name}
                    </li>
                ))}
            </ul>
            
        </div>
    );
}
