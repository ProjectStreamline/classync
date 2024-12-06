import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { FormContext } from '../../context/FormContext';
import Select from 'react-select';
import supabase from '../../config/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StuRegistration = () => {
  const { email } = useContext(AuthContext);
  const { isFloated, slots } = useContext(FormContext);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [backlogSlots, setBacklogSlots] = useState([]);

  const studentEmail = email.replace('@iiitn.ac.in', '');

  useEffect(() => {
    // Fetch backlog data for the student
    const fetchBacklogSlots = async () => {
      const { data, error } = await supabase
        .from('backlog')
        .select('slot, course_name')
        .eq('student_id', studentEmail);

      if (error) {
        console.error('Error fetching backlog data:', error);
      } else {
        console.log('Backlog Data:', data);
        setBacklogSlots(data);
      }
    };

    // Fetch submission status
    const fetchSubmissionStatus = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('hasSubmitted')
        .eq('student_id', studentEmail)
        .single();

      if (error) {
        console.error('Error checking submission status:', error);
      } else {
        setHasSubmitted(data?.hasSubmitted);
      }
    };

    fetchBacklogSlots();
    fetchSubmissionStatus();
  }, [studentEmail]);

  const getFilteredOptions = (slotId) => {
    const backlogCourse = backlogSlots.find((b) => b.slot === slotId);

    if (backlogCourse) {
      // Slot found in backlog, return only that course as the option
      return [
        {
          value: backlogCourse.course_name,
          label: backlogCourse.course_name,
        },
      ];
    }

    // Slot not in backlog, return default options
    const slot = slots.find((slot) => slot.id === slotId);
    if (slot) {
      return slot.courseOptions.map((option) => ({
        value: option.label,
        label: option.label,
      }));
    }

    return []; // No match or options available
  };

  const handleSelectChange = (slotId, selected) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [slotId]: selected,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (hasSubmitted) {
  //     toast.success("You've already submitted the form!");
  //     return;
  //   }

  //   // Submission logic
  //   // ...
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasSubmitted) {
      alert("You've already submitted the form!");
      return;
    }

    console.log('Selected Courses before insert:', selectedCourses);

    let submissionSuccessful = true;

    for (const slotId in selectedCourses) {
      const selectedCourse = selectedCourses[slotId]?.value;
      if (selectedCourse) {
        console.log(
          `Attempting to insert into ${selectedCourse} for student ID ${studentEmail}`
        );
        // insert into courses table
        const { data, error } = await supabase
          .from(selectedCourse)
          .insert({ student_id: studentEmail });

        if (error) {
          console.error(
            `Error inserting into ${selectedCourse}:`,
            error.message
          );
          alert(
            `An error occurred while inserting into ${selectedCourse}. ${error.message}`
          );
          submissionSuccessful = false;
        } else {
          console.log(
            `Successfully inserted student ID ${studentEmail} into ${selectedCourse}`
          );
        }

        //insert into attendance table
        const { data: attendanceData, error: attendanceError } = await supabase
          .from(`${selectedCourse}_attendance`)
          .insert({ student_id: studentEmail });

        if (attendanceError) {
          console.log(
            `Error inserting into ${selectedCourse}_attendance:`,
            attendanceError.message
          );
          alert(
            `An error occurred while inserting into ${selectedCourse}. ${error.message}`
          );
          submissionSuccessful = false;
        } else {
          console.log(
            `Successfully inserted student ID ${studentEmail} into ${selectedCourse}_attendance`
          );
        }
      } else {
        toast.warn(`No course selected for slot ID ${slotId}`);
      }
    }

    if (submissionSuccessful) {
      const { data, error } = await supabase
        .from('students')
        .update({ hasSubmitted: true })
        .eq('student_id', studentEmail);

      if (error) {
        console.error('Error submitting the form:', error);
        toast.error('An error occurred while submitting the form.');
      } else {
        setHasSubmitted(true);
        toast.success('Form submitted successfully!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">
        Student Registration
      </h2>
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8">
        {isFloated ? (
          !hasSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {slots.map((slot) => (
                <div key={slot.id} className="space-y-2">
                  <label
                    htmlFor={slot.id}
                    className="block text-sm font-medium text-gray-300"
                  >
                    {slot.id}
                  </label>
                  <Select
                    options={getFilteredOptions(slot.id)}
                    value={selectedCourses[slot.id] || null}
                    onChange={(selected) =>
                      handleSelectChange(slot.id, selected)
                    }
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: '#2D3748',
                        borderColor: '#4A5568',
                        color: '#E2E8F0',
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: '#E2E8F0',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: '#2D3748',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? '#4A5568'
                          : state.isFocused
                          ? '#3C4451'
                          : '#2D3748',
                        color: '#E2E8F0',
                      }),
                    }}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-center text-lg text-green-400">
              You have already submitted the form. Thank you!
            </p>
          )
        ) : (
          <p className="text-center text-lg text-yellow-500">
            The course registration form is not yet available. Please wait for
            further instructions.
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default StuRegistration;
