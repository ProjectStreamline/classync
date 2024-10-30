import { useState, useContext } from 'react';
import { ImCross } from 'react-icons/im';
import MultiSelect from './Multiselect';
import { FormContext } from '../../context/FormContext';
import { Link } from 'react-router-dom';
const RegistrationForm = () => {
  const { isFloated, floatForm, courses, slots } = useContext(FormContext);

  return (
    <div className="w-full flex flex-row justify-between sticky  min-h-screen m-4 ml-0">
      <div className="flex flex-col  bg-card-bg rounded-xl p-4 min-w-[46%] m-4">
        <h2 className="text-2xl font-bold m-4 ml-0">Registration Form</h2>
        <div className="">
          {slots.map((slot) => {
            // console.log(slot.id);

            return <MultiSelect key={slot.id} slot={slot} />;
          })}
        </div>
      </div>
      <div className="flex flex-col bg-card-bg rounded-xl min-w-[46%] m-4 p-6">
        <button
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4"
          onClick={floatForm}
        >
          {isFloated ? 'Registration Started' : 'Start Registration'}
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
