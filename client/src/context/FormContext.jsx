import { createContext, useState } from 'react';
import supabase from '../config/supabaseClient';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFloated, setIsFloated] = useState(
    () => localStorage.getItem('isFloated') || false
  );

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({});

  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select(`
      course_id, 
        course_code, 
        course_name, 
        lab, 
        faculties(faculty_id, faculty_name)
        `);
    if (error) {
      console.log(error);
    }
    if (data) {
      setCourses(data);
      // console.log(data);
    }
  };

  const slots = [
    {
      id: 'A',
      courseOptions: [],
    },
    {
      id: 'B',
      courseOptions: [],
    },
    {
      id: 'C',
      courseOptions: [],
    },
    {
      id: 'D',
      courseOptions: [],
    },
    {
      id: 'E',
      courseOptions: [],
    },
    {
      id: 'F',
      courseOptions: [],
    },
    {
      id: 'G',
      courseOptions: [],
    },
    {
      id: 'H',
      courseOptions: [],
    },
  ];

  const floatForm = () => {
    setIsFloated(true);
    localStorage.setItem('isFloated', JSON.stringify(true));
  };

  return (
    <FormContext.Provider
      value={{
        floatForm,
        isFloated,
        slots,
        courses,
        fetchCourses,
        selectedCourses,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
