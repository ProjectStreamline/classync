import { useContext, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import Select from 'react-select';
const StuRegistration = () => {
  const { isFloated, slots } = useContext(FormContext);
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
      student Registration
      <div>
        {isFloated ? (
          <form>
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
            <button>Submit</button>
          </form>
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
