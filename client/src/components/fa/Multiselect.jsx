import { useState, useContext } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';
const MultiSelect = ({ slot }) => {
  // const [slot, setSlot] = useState(slot);
  const [course, setCourse] = useState([]);
  const { isFloated, floatForm, courses, slots } = useContext(FormContext);

  const handleChange = (course) => {
    setCourse(course);
    slots.courseOptions = course;
    console.log(slot);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="slot" className="text-lg font-bold text-card-text">
        Slot {slot.id}
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
