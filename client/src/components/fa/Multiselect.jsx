import { useState, useContext } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';
const MultiSelect = ({ id, courses }) => {
  const [slot, setSlot] = useState([]);
  // const { floatForm, isFloated, slots, handleSlotChange } =
  //   useContext(FormContext);
  console.log(courses);
  const handleChange = (slot) => {
    setSlot(slot);
    console.log(slot);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="slot" className="text-lg font-bold text-card-text">
        Slot {id}
      </label>
      <Select
        isMulti
        name="slot"
        options={courses}
        onChange={handleChange}
        classNamePrefix="select"
        className="h-10 w-full"
      />
    </div>
  );
};

export default MultiSelect;
