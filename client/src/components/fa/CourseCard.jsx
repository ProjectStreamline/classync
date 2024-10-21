import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link
      className="bg-white shadow-md rounded-xl p-4 m-4 cursor-pointer flex flex-row justify-between w-auto hover:bg-gray-200 duration-300"
      to={`/fa/course/${course.code}`}
    >
      <div>
        <div className="font-bold text-xl mb-3">
          <h3>{course.name}</h3>
        </div>
        <div className="text-sm text-gray-500">
          <p>{course.faculty}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between mx-145 items-end">
        <div className="text-sm mb-4 mt-1 text-lime-900 font-bold">
          {course.credits} Credits
        </div>
        <div
          className={`text-sm text-right ${
            course.lab ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {course.lab ? 'Lab Available' : 'Lab NA'}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
