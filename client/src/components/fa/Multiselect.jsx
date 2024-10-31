import { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';
const MultiSelect = ({ slot }) => {
  // const [slot, setSlot] = useState(slot);
  const [course, setCourse] = useState([]);
  const { courses, slots, fetchCourses } = useContext(FormContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const coursesData = courses.map((course) => ({
    label: course.course_name,
    value: course.course_code,
  }));
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
        options={coursesData}
        onChange={handleChange}
        classNamePrefix="select"
        className="h-10 w-full"
      />
    </div>
  );
};

export default MultiSelect;
