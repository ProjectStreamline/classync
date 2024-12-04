
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link
      className="bg-white shadow-lg rounded-xl p-4 m-4 cursor-pointer flex flex-row justify-between w-[90%] hover:bg-gray-100 transition-all duration-300"
      to={`/fa/course/${course.course_code}`}
    >
      <div>
        <div className="font-semibold text-xl mb-3 text-gray-800">
          <h3>{course.course_name}</h3>
        </div>
        <div className="text-sm text-gray-600">
          <p>{course.faculties.faculty_name}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="text-sm mb-4 mt-1 font-semibold text-lime-900">
          {course.lab ? 4 : 3} Credits
        </div>
        <div
          className={`text-sm text-right ${
            course.lab ? 'text-red-600' : 'text-green-600'
          } font-semibold`}
        >
          {course.lab ? 'Lab Available' : 'Lab NA'}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
