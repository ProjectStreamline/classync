import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const RegisteredStudents = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    const CourseStudents = async () => {
      const { data, error } = await supabase
        .from(`${course}`)
        .select('student_id');

      if (data) {
        setStudents(data);
      } else if (error) {
        console.error('Error fetching students:', error);
      }
    };
    CourseStudents();
  }, [course]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-xl font-semibold text-gray-700 mb-4">{course}</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Registered Students</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul className="space-y-4">
          {students.length > 0 ? (
            students.map((student, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-200 py-3 px-4 hover:bg-gray-50"
              >
                <span className="text-lg font-medium text-gray-700">{student.student_id}</span>

                <Link
                  to={`/student-details/${student.student_id}`}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  View Details
                </Link>
              </li>
            ))
          ) : (
            <li className="text-lg text-gray-500">No students registered.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RegisteredStudents;
