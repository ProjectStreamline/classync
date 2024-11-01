import { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { FormContext } from '../../context/FormContext';

const MultiSelect = ({ slot }) => {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const { courses, slots, fetchCourses } = useContext(FormContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const coursesData = courses.map((course) => ({
    label: course.course_name,
    value: course.course_code,
  }));

  // course.map((c) => {
  //   setSelectedCourse(c);
  //   console.log(selectedCourse);
  // });
  // console.log(selectedCourse);
  // const updatedCourses = coursesData.filter((c) => {
  //   console.log(course);
  //   c.value !== course.value;
  // });
  // console.log(updatedCourses);
  const handleChange = (course) => {
    setCourse(course);
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
