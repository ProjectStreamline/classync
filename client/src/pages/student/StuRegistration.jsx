import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { FormContext } from '../../context/FormContext';
import Select from 'react-select';
import supabase from '../../config/supabaseClient';

const StuRegistration = () => {
  const { email } = useContext(AuthContext);
  const { isFloated, slots } = useContext(FormContext);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  console.log(isFloated);
  // console.log(floatForm);

  const studentEmail = email.replace('@iiitn.ac.in', '');

  useEffect(() => {
    const checkSubmissionStatus = async () => {
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
    checkSubmissionStatus();
  }, [studentEmail]);

  const handleSelectChange = (slotId, selected) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [slotId]: selected,
    }));
  };

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
      } else {
        console.warn(`No course selected for slot ID ${slotId}`);
      }
    }

    if (submissionSuccessful) {
      const { data, error } = await supabase
        .from('students')
        .update({ hasSubmitted: true })
        .eq('student_id', studentEmail);

      if (error) {
        console.error('Error submitting the form:', error);
        alert('An error occurred while submitting the form.');
      } else {
        setHasSubmitted(true);
        alert('Form submitted successfully!');
      }
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      {/* <button onClick={floatForm}>{isFloated ? 'Close' : 'Open'}</button> */}
      <div>
        {isFloated ? (
          !hasSubmitted ? (
            <form onSubmit={handleSubmit}>
              {slots.map((slot) => (
                <div key={slot.id}>
                  <label htmlFor={slot.id}>{slot.id}</label>
                  <Select
                    options={slot.courseOptions.map((option) => ({
                      value: option.label,
                      label: option.label,
                    }))}
                    value={selectedCourses[slot.id] || null}
                    onChange={(selected) =>
                      handleSelectChange(slot.id, selected)
                    }
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          ) : (
            <p>You have already submitted the form. You cannot submit again.</p>
          )
        ) : (
          <p>
            The course registration form is not yet available. Please wait for
            further instructions.
          </p>
        )}
      </div>
    </div>
  );
};

export default StuRegistration;
