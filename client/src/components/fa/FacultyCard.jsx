import React from 'react';

const FacultyCard = ({ faculty }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 m-4 cursor-pointer flex flex-row justify-between w-auto hover:bg-gray-200 duration-300">
      <div>
        <div className="font-bold text-xl mb-3">
          <h3>{faculty.name}</h3>
        </div>
        <div className="text-sm text-gray-500">
          <p>{faculty.position}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between mx-145 items-end">
        <div className="text-sm mb-4 mt-1 text-lime-900 font-bold">
          {faculty.department}
        </div>
      </div>
    </div>
  );
};
export default FacultyCard;
