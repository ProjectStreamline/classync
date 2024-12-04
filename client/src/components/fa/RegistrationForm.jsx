import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MultiSelect from './MultiSelect';
import { FormContext } from '../../context/FormContext';
import supabase from '../../config/supabaseClient';

const RegistrationForm = () => {
  const { isFloated, toggleIsFloated, slots } = useContext(FormContext);
  const [selectedCourses, setSelectedCourses] = useState({});

  const handleCourseSelection = (slotId, courses) => {
    setSelectedCourses((prevCourses) => ({
      ...prevCourses,
      [slotId]: courses,
    }));
  };

  const handleCreateForm = async () => {
    for (const slotId in selectedCourses) {
      const tableName = `slot_${slotId}`;
      const courseEntries = selectedCourses[slotId].map((course) => ({
        course_name: course.label,
      }));

      try {
        const { data, error } = await supabase
          .from(tableName)
          .insert(courseEntries);

        if (error) {
          console.error(`Error inserting into ${tableName}:`, error.message);
        }
      } catch (error) {
        console.error(`Failed to create form in table ${tableName}`, error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 min-h-screen p-6 bg-gray-50">
      {/* Left Section: Form */}
      <div className="flex flex-col w-full md:w-[48%] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Registration Form
        </h2>
        <div className="space-y-4">
          {slots.map((slot) => (
            <MultiSelect
              key={slot.id}
              slot={slot}
              onCourseSelect={handleCourseSelection}
            />
          ))}
        </div>
      </div>

      {/* Right Section: Actions & Stats */}
      <div className="flex flex-col w-full md:w-[48%] bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4 mb-6">
          <button
            className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 hover:bg-blue-700 transition-all"
            onClick={handleCreateForm}
          >
            Create Form
          </button>
          <button
            className="w-full bg-red-600 text-white font-semibold rounded-lg py-3 hover:bg-red-700 transition-all"
            onClick={toggleIsFloated}
          >
            {isFloated ? 'Stop Registration' : 'Start Registration'}
          </button>
          <Link
            to="/fa/student-data"
            className="w-full bg-green-600 text-white text-center font-semibold rounded-lg py-3 hover:bg-green-700 transition-all"
          >
            Registered Student Data
          </Link>
          <Link
            to="/fa/student-data-backlog"
            className="w-full bg-orange-600 text-white text-center font-semibold rounded-lg py-3 hover:bg-orange-700 transition-all"
          >
            Backlogs
          </Link>
        </div>

        {/* Quick Stats Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Quick Stats</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong>Semester:</strong> 7th
            </li>
            <li>
              <strong>Branch:</strong> ECE
            </li>
            <li>
              <strong>Active Courses:</strong> 10
            </li>
            <li>
              <strong>Total Registered Students:</strong> 100
            </li>
            <li>
              <strong>Remaining Students:</strong> 30
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
