import { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';

const MultiSelect = ({ slot, onCourseSelect }) => {
  const [course, setCourse] = useState([]);
  const { courses, fetchCourses } = useContext(FormContext);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const coursesData = courses.map((course) => ({
    label: course.course_name,
    value: course.course_code,
  }));

  const handleChange = (selectedCourses) => {
    setCourse(selectedCourses);
    onCourseSelect(slot.id, selectedCourses);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 shadow-sm rounded-lg">
      <label
        htmlFor={`slot-${slot.id}`}
        className="text-lg font-semibold text-gray-700"
      >
        Slot {slot.id}
      </label>
      <Select
        id={`slot-${slot.id}`}
        isMulti
        name="slot"
        value={course}
        options={coursesData}
        onChange={handleChange}
        placeholder="Select courses..."
        classNamePrefix="select"
        className="text-gray-700"
        styles={{
          control: (provided) => ({
            ...provided,
            padding: '0.2rem',
            borderRadius: '0.5rem',
            borderColor: '#d1d5db',
            '&:hover': { borderColor: '#9ca3af' },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? '#4f46e5'
              : state.isFocused
              ? '#e0e7ff'
              : 'white',
            color: state.isSelected ? 'white' : '#111827',
            '&:hover': { backgroundColor: '#e0e7ff', color: '#111827' },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#e0e7ff',
            borderRadius: '0.25rem',
            padding: '0 0.5rem',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: '#4f46e5',
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: '#4f46e5',
            '&:hover': { backgroundColor: '#4f46e5', color: 'white' },
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
