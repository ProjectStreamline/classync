import React, { useState, useContext, useEffect } from 'react';
import { CourseContext } from '../../context/CourseContext';
import FacultyCard from './FacultyCard';
import supabase from '../../config/supabaseClient';

const Faculties = () => {
  const { faculties, fetchFaculties } = useContext(CourseContext);
  const [newFaculty, setNewFaculty] = useState({
    faculty_name: '',
    department: '',
    gmail: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleAddFaculty = async (e) => {
  e.preventDefault();

  if (!newFaculty.faculty_name || !newFaculty.department || !newFaculty.gmail) {
    setErrorMessage('All fields are required.');
    return;
  }

  // Check for duplicates
  const { data, error: checkError } = await supabase
    .from('faculties')
    .select('*')
    .eq('gmail', newFaculty.gmail)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    setErrorMessage('Error checking existing faculty.');
    return;
  }

  if (data) {
    setErrorMessage('Faculty with this Gmail already exists.');
    return;
  }


  const { error } = await supabase.from('faculties').insert([newFaculty]);

  if (error) {
    setErrorMessage('Failed to add faculty. Please try again.');
    console.error('Error adding faculty:', error.message);
  } else {
    setErrorMessage('');
    fetchFaculties(); // Refresh the list of faculties
    setNewFaculty({ faculty_name: '', department: '', gmail: '' }); // Reset form
  }
};


  return (
    <div className="flex flex-col w-[60%] m-8 ml-0 bg-card-bg rounded-xl">
      <h2 className="text-2xl font-bold m-4">Available Faculties</h2>

      {/* Add Faculty Form */}
      <div className="m-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Add New Faculty</h3>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <form onSubmit={handleAddFaculty} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Faculty Name
            </label>
            <input
              type="text"
              name="faculty_name"
              value={newFaculty.faculty_name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="Enter faculty name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={newFaculty.department}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg"
            >
              <option value="">Select a department</option>
              <option value="Basic Science">Basic Science</option>
              <option value="ECE">ECE</option>
              <option value="CSE">CSE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gmail
            </label>
            <input
              type="email"
              name="gmail"
              value={newFaculty.gmail}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="Enter Gmail ID"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Add Faculty
          </button>
        </form>
      </div>

      {/* Faculty List */}
      <div className="flex-1 items-center w-auto h-[400px] overflow-auto no-scrollbar">
        {faculties.map((faculty, index) => (
          <FacultyCard key={index} faculty={faculty} />
        ))}
      </div>
    </div>
  );
};

export default Faculties;
