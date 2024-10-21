import React, { useState } from 'react';
import Select from 'react-select';
const SelectDropdown = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="courseCode" className="text-lg font-bold text-card-text">
        {label}
      </label>
      <Select
        defaultValue={selectedOption}
        options={options}
        onChange={setSelectedOption}
        classNamePrefix="select"
        className="h-10 min-w-96"
      />
    </div>
  );
};

export default SelectDropdown;
