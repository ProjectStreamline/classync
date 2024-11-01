import { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';

const MultiSelect = ({ slot, onCourseSelect }) => {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const { courses, fetchCourses } = useContext(FormContext);

  useEffect(() => {
    console.log('Fetching courses...'); // Debugging line
    fetchCourses();
  }, []);

  const coursesData = courses.map((course) => ({
    label: course.course_name,
    value: course.course_code,
  }));

  const handleChange = (selectedCourses) => {
    console.log(`Courses selected for slot ${slot.id}:`, selectedCourses); // Debugging line
    setCourse(selectedCourses);
    onCourseSelect(slot.id, selectedCourses);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="slot" className="text-lg font-bold text-card-text">
        Slot {slot.id}
      </label>
      <Select
        isMulti
        name="slot"
        value={course}
        options={coursesData}
        onChange={handleChange}
        classNamePrefix="select"
        className="h-10 w-full"
      />
    </div>
  );
};

export default MultiSelect;
