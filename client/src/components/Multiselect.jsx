import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelect = ({ id, courseOptions }) => {
  const [slot, setSlot] = useState([]);
  const handleChange = (slot) => {
    setSlot({ slot });
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
        options={courseOptions}
        onChange={handleChange}
        classNamePrefix="select"
        className="h-10 w-full"
      />
    </div>
  );
};

export default MultiSelect;
