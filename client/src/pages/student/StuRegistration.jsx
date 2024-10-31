import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { FormContext } from '../../context/FormContext';
import Select from 'react-select';
import supabase from '../../config/supabaseClient';

const StuRegistration = () => {
  const { email } = useContext(AuthContext);
  const { isFloated, slots } = useContext(FormContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  

  const studentEmail = email.replace('@iiitn.ac.in', '');



// const testConnection = async () => {

// const { data, error } = await supabase.from('students').select('*');

//   if (error) {
//     console.error('Error fetching data:', error);
//   } else {
//     console.log('Data fetched successfully:', data);
//   }
// };

// useEffect(() => {
//   testConnection();
// }, []);


  useEffect(() => {
    const checkSubmissionStatus = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('hasSubmitted')
    .eq('student_id', studentEmail)  // Use studentEmail directly, without adding the domain
    .single();
console.log(data)
  if (error) {
    console.error('Error checking submission status:', error);
  } else {
    setHasSubmitted(data?.hasSubmitted);
  }
};
    checkSubmissionStatus();
  }, [studentEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasSubmitted) {
      alert("You've already submitted the form!");
      return;
    }

    const { data,error } = await supabase
      .from('students')
      .update({ hasSubmitted: true })
      .eq('student_id', studentEmail);
     

    if (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the form.');
    } else {
      setHasSubmitted(true);
      console.log('working test',data)
      alert('Form submitted successfully!');
    }
  };

  return (
    <div>
      Student Registration
      <div>
        {isFloated ? (
          !hasSubmitted ? (
            <form onSubmit={handleSubmit}>
              {slots.map((slot) => (
                <div key={slot.id}>
                  <label htmlFor={slot.id}>{slot.id}</label>
                  <Select
                    options={slot.courseOptions}
                    value={selectedOption}
                    onChange={setSelectedOption}
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
