import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';

const StudentData = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('course_name');
      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {

    const fetchCourseData = async () => {
      setLoading(true);
      const tempCourseData = {};
      for (const course of courses) {
        const { data, error } = await supabase.from(course.course_name).select('*');
        if (error) {
          console.error(`Error fetching data for ${course.course_name}:`, error);
        } else {
          tempCourseData[course.course_name] = data;
        }
      }
      setCourseData(tempCourseData);
      setLoading(false);
    };

    if (courses.length > 0) {
      fetchCourseData();
    }
  }, [courses]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Course Tables</h2>
      {loading ? (
        <p className="text-center text-lg text-yellow-500">Loading course data...</p>
      ) : (
        <div className="space-y-8">
          {courses.map((course) => (
            <div
              key={course.course_name}
              className="bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">{course.course_name}</h3>
              {courseData[course.course_name]?.length > 0 ? (
                <table className="w-full border-collapse border border-gray-700 text-gray-300">
                  <thead>
                    <tr className="bg-gray-700 text-gray-100">
                      {Object.keys(courseData[course.course_name][0]).map((col) => (
                        <th
                          key={col}
                          className="border border-gray-600 px-4 py-2 text-left"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courseData[course.course_name].map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}
                      >
                        {Object.values(row).map((value, colIndex) => (
                          <td
                            key={colIndex}
                            className="border border-gray-600 px-4 py-2"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">No data available for this course.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentData;
