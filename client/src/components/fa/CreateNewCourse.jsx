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
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="rounded-xl p-4 m-4 cursor-pointer">
      <button
        className="text-white font-bold w-full bg-black h-12 rounded-lg"
        onClick={() => setOpenCourse(true)}
      >
        Create new Course
      </button>
      <div
        className={`fixed flex justify-center items-center  w-full h-full p-5 top-0 left-0 ${
          openCourse ? 'block bg-black/30' : 'hidden'
        }`}
        onClose={() => setOpenCourse(false)}
      >
        <form
          className="bg-card-bg w-fit h-fit rounded-lg p-5"
          onSubmit={handleSubmit}
        >
          <div className="relative mb-4">
            <button
              className="text-navbar-text w-7 h-7 bg-navbar-bg rounded-full absolute right-0 top-0 flex items-center justify-center text-white"
              onClick={() => setOpenCourse(false)}
            >
              <ImCross />
            </button>
            <h1 className="text-2xl font-bold text-card-text">
              Create New Course
            </h1>
          </div>
          {/* semester */}
          {/* <div className="flex flex-col gap-2">
            <label
              htmlFor="courseCode"
              className="text-lg font-bold text-card-text"
            >
              Semester
            </label>
            <p className="border bg-white border-gray-300 rounded-md p-2">7</p>
          </div> */}
          {/* coursecode */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="courseName"
              className="text-lg font-bold text-card-text"
            >
              Course Code
            </label>
            <input
              type="text"
              placeholder="Enter Course Name"
              className="border border-gray-300 rounded-md p-2"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          {/* course name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="courseName"
              className="text-lg font-bold text-card-text"
            >
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter Course Name"
              className="border border-gray-300 rounded-md p-2"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          {/* faculty */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="courseCode"
              className="text-lg font-bold text-card-text"
            >
              Faculty
            </label>
            <Select
              defaultValue={faculty}
              options={facultyData}
              onChange={setFaculty}
              classNamePrefix="select"
              className="h-10 min-w-96"
            />
          </div>

          {/* lab */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="courseCode"
              className="text-lg font-bold text-card-text"
            >
              Lab
            </label>
            <Select
              defaultValue={lab}
              options={labOptions}
              onChange={setLab}
              classNamePrefix="select"
              className="h-10 min-w-96"
            />
          </div>
          <button
            className="text-navbar-text font-bold w-full bg-navbar-bg h-12 rounded-lg mt-3 text-white"
            type="submit"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewCourse;
