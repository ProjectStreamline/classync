import { useState, useContext, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { CourseContext } from '../../context/CourseContext';
import supabase from '../../config/supabaseClient';
import Select from 'react-select';

const CreateNewCourse = () => {
  const { faculties, fetchFaculties } = useContext(CourseContext);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const facultyData = faculties.map((faculty) => ({
    label: faculty.faculty_name,
    value: faculty.faculty_id,
  }));

  const labOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const [openCourse, setOpenCourse] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [faculty, setFaculty] = useState('');
  const [lab, setLab] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseCode || !faculty || !lab) {
      console.log('Please fill all the fields');
      return;
    }

    const { data, error } = await supabase.from('courses').insert([
      {
        course_code: courseCode,
        course_name: courseName,
        lab: lab.value,
        faculty: faculty.value,
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }

    const { error: tableError } = await supabase.rpc('create_course_table', {
      course_name: courseName,
    });

    if (tableError) {
      console.log('Error creating table:', tableError);
    } else {
      console.log('Course created successfully and table initialized');
    }

    const { error: attendanceTableError } = await supabase.rpc(
      'create_attendance_table',
      { course_name: courseName }
    );
    if (attendanceTableError) {
      console.error('Error creating attendance table:', attendanceTableError);
    } else {
      console.log('Attendance table created successfully');
    }

    setOpenCourse(false);
  };

  return (
    <div className="rounded-xl p-4 m-4">
      {/* Button to open modal */}
      <button
        className="text-white font-bold w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 h-12 rounded-lg transition duration-300"
        onClick={() => setOpenCourse(true)}
      >
        Create New Course
      </button>

      {/* Modal */}
      {openCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenCourse(false)}
            >
              <ImCross className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Create New Course
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course Code */}
              <div>
                <label
                  htmlFor="courseCode"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Code
                </label>
                <input
                  type="text"
                  id="courseCode"
                  placeholder="Enter Course Code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Course Name */}
              <div>
                <label
                  htmlFor="courseName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  placeholder="Enter Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Faculty */}
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Faculty
                </label>
                <Select
                  defaultValue={faculty}
                  options={facultyData}
                  onChange={setFaculty}
                  className="mt-1"
                  classNamePrefix="select"
                />
              </div>

              {/* Lab */}
              <div>
                <label
                  htmlFor="lab"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Lab
                </label>
                <Select
                  defaultValue={lab}
                  options={labOptions}
                  onChange={setLab}
                  className="mt-1"
                  classNamePrefix="select"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition duration-300"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewCourse;
