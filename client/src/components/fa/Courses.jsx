import { useState } from 'react';
import CourseCard from './CourseCard';
import CreateNewCourse from './CreateNewCourse';

const Courses = () => {
  const courses = [
    {
      code: 'MAL106',
      name: 'Probability and Statistics',
      faculty: 'Dr. Nishant Namdev',
      credits: 4,
      classroom: 'Room No. 301',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: false,
    },
    {
      code: 'ILA107',
      name: 'Intro to Linear Algebra',
      faculty: 'Dr. Kamaljeet',
      credits: 4,
      classroom: 'Room No. 302',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: true,
    },
    {
      code: 'MAL106',
      name: 'Probability and Statistics',
      faculty: 'Dr. Nishant Namdev',
      credits: 4,
      classroom: 'Room No. 301',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: false,
    },
    {
      code: 'ILA107',
      name: 'Intro to Linear Algebra',
      faculty: 'Dr. Kamaljeet',
      credits: 4,
      classroom: 'Room No. 302',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: true,
    },
    {
      code: 'MAL106',
      name: 'Probability and Statistics',
      faculty: 'Dr. Nishant Namdev',
      credits: 4,
      classroom: 'Room No. 301',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: false,
    },
    {
      code: 'ILA107',
      name: 'Intro to Linear Algebra',
      faculty: 'Dr. Kamaljeet',
      credits: 4,
      classroom: 'Room No. 302',
      startDate: '5th January 2024',
      endDate: '15th May 2024',
      createdDate: '2nd January 2024',
      lab: true,
    },
    // Add more courses as needed
  ];
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
