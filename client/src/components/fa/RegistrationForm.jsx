import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MultiSelect from './MultiSelect';
import { FormContext } from '../../context/FormContext';
import supabase from '../../config/supabaseClient';

const RegistrationForm = () => {
  const { isFloated, toggleIsFloated, slots } = useContext(FormContext);
  const [selectedCourses, setSelectedCourses] = useState({});

  // Collect selected courses for each slot
  const handleCourseSelection = (slotId, courses) => {
    console.log(`Selected courses for slot ${slotId}:`, courses); // Debugging line
    setSelectedCourses((prevCourses) => ({
      ...prevCourses,
      [slotId]: courses,
    }));
  };

  const handleCreateForm = async () => {
    console.log('Starting form creation...'); // Debugging line
    console.log('Selected courses:', selectedCourses); // Debugging line

    for (const slotId in selectedCourses) {
      const tableName = `slot_${slotId}`; // Table name like slot_A, slot_B, etc.
      const courseEntries = selectedCourses[slotId].map((course) => ({
        course_name: course.label,
      }));

      console.log(`Inserting into table ${tableName}:`, courseEntries); // Debugging line

      try {
        const { data, error } = await supabase
          .from(tableName)
          .insert(courseEntries);

        if (error) {
          console.error(`Error inserting into ${tableName}:`, error.message); // Debugging line
        } else {
          console.log(`Inserted data into ${tableName}:`, data); // Debugging line
        }
      } catch (error) {
        console.error(`Failed to create form in table ${tableName}`, error); // Debugging line
      }
    }
  };

  return (
    <div className="w-full flex flex-row justify-between sticky min-h-screen m-4 ml-0">
      <div className="flex flex-col bg-card-bg rounded-xl p-4 min-w-[46%] m-4">
        <h2 className="text-2xl font-bold m-4 ml-0">Registration Form</h2>
        <div className="">
          {slots.map((slot) => (
            <MultiSelect
              key={slot.id}
              slot={slot}
              onCourseSelect={handleCourseSelection}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col bg-card-bg rounded-xl min-w-[46%] m-4 p-6">
        <button
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4"
          onClick={handleCreateForm}
        >
          Create Form
        </button>
        <button
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4"
          onClick={toggleIsFloated}
        >
          {isFloated ? 'Stop Registration' : 'Start Registration'}
        </button>
        <Link
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4 text-center"
          to="/fa/student-data"
        >
          Registered student data
        </Link>
        <Link
          className="text-l font-bold text-white bg-black rounded-lg p-4 mb-4 text-center"
          to="/fa/student-data-backlog"
        >
          Backlogs
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
