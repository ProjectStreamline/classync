import { useState, useContext, useEffect } from 'react';
import CourseCard from './CourseCard';
import CreateNewCourse from './CreateNewCourse';
import { FormContext } from '../../context/FormContext';

const Courses = () => {
  const { courses, fetchCourses } = useContext(FormContext);
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col w-[40%] m-8 ml-0 bg-card-bg rounded-xl">
      <h2 className="text-2xl font-bold m-4">Manage Courses</h2>
      <div className="m-4 mt-0">
        <input
          type="text"
          placeholder="Search for a course"
          className="flex-1 p-2 rounded-xl border w-full"
        />
      </div>
      <div className="flex-1 items-center w-auto h-[400px] overflow-auto no-scrollbar">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <CreateNewCourse />
    </div>
  );
};

export default Courses;
