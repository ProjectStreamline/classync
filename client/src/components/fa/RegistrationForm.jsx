import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import MultiSelect from '../Multiselect';
import { Link } from 'react-router-dom';
const RegistrationForm = () => {
  const [isFloated, setIsFloated] = useState(false);
  const slots = [
    {
      id: 'A',
      courseOptions: [
        { label: 'CSE 101', value: 'CSE 101' },
        { label: 'CSE 102', value: 'CSE 102' },
      ],
    },
    {
      id: 'B',
      courseOptions: [
        { label: 'CSE 103', value: 'CSE 103' },
        { label: 'CSE 104', value: 'CSE 104' },
      ],
    },
    {
      id: 'C',
      courseOptions: [
        { label: 'CSE 105', value: 'CSE 105' },
        { label: 'CSE 106', value: 'CSE 106' },
      ],
    },
    {
      id: 'D',
      courseOptions: [
        { label: 'CSE 101', value: 'CSE 101' },
        { label: 'CSE 102', value: 'CSE 102' },
      ],
    },
    {
      id: 'E',
      courseOptions: [
        { label: 'CSE 103', value: 'CSE 103' },
        { label: 'CSE 104', value: 'CSE 104' },
      ],
    },
    {
      id: 'F',
      courseOptions: [
        { label: 'CSE 105', value: 'CSE 105' },
        { label: 'CSE 106', value: 'CSE 106' },
      ],
    },
    {
      id: 'G',
      courseOptions: [
        { label: 'CSE 103', value: 'CSE 103' },
        { label: 'CSE 104', value: 'CSE 104' },
      ],
    },
    {
      id: 'H',
      courseOptions: [
        { label: 'CSE 105', value: 'CSE 105' },
        { label: 'CSE 106', value: 'CSE 106' },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-row justify-between sticky  min-h-screen m-4 ml-0">
      <div className="flex flex-col  bg-card-bg rounded-xl p-4 min-w-[46%] m-4">
        <h2 className="text-2xl font-bold m-4 ml-0">Registration Form</h2>
        <div className="">
          {slots.map((slot) => {
            return (
              <MultiSelect
                key={slot.id}
                id={slot.id}
                courseOptions={slot.courseOptions}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col bg-card-bg rounded-xl min-w-[46%] m-4 p-6">
        <button
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4"
          onClick={() => setIsFloated(!isFloated)}
        >
          {isFloated ? 'Stop Registration' : 'Start Registration'}
        </button>
        <Link
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4 text-center"
          to="/fa/student-data"
        >
          Registered student data
        </Link>
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-l font-bold mb-2">Quick Stats</h2>
          <div>
            <p>Semester: 7th</p>
            <p>Branch: ECE</p>
            <p>Active Courses for this semester: 10</p>
            <p>Total Registered Students: 100</p>
            <p>Remaining Students: 30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
