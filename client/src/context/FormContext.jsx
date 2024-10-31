import { createContext, useState } from 'react';
import supabase from '../config/supabaseClient';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFloated, setIsFloated] = useState(
    () => localStorage.getItem('isFloated') || false
  );

  const [courses, setCourses] = useState([]);
  // const courses = [
  //   { value: 'ABC123', label: 'Technical Communication' },
  //   { value: 'ABC456', label: 'PG&D' },
  //   { value: 'XYZ123', label: 'TAI' },
  //   { value: 'PQR123', label: 'NLUG' },
  //   { value: 'ABC567', label: 'D&M' },
  //   { value: 'XYZ234', label: 'FML' },
  //   { value: 'PQR567', label: 'PI' },
  //   { value: 'XYZ890', label: 'OC' },
  //   { value: 'PQR890', label: 'IND-IOT' },
  //   { value: 'ABC568', label: 'Robotics' },
  //   { value: 'XYZ305', label: 'DIP' },
  //   { value: 'PQR284', label: 'NNDL' },
  // ];
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
      value={{ floatForm, isFloated, slots, courses, fetchCourses }}
    >
      {children}
    </FormContext.Provider>
  );
};
