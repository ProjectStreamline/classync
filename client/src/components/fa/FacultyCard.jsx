import React from 'react';

const FacultyCard = ({ faculty }) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-6 m-4 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg hover:bg-gray-100 transition duration-300">
      {/* Left Section */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{faculty.faculty_name}</h3>
        <p className="text-sm text-gray-500 mt-2">{faculty.position || 'Position not specified'}</p>
      </div>

      {/* Right Section */}
      <div className="mt-4 sm:mt-0 sm:text-right">
        <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm">
          {faculty.department || 'No department'}
        </span>
      </div>
    </div>
  );
};

export default FacultyCard;
