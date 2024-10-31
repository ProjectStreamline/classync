import { createContext, useState } from 'react';
import supabase from '../config/supabaseClient';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [faculties, setFaculties] = useState([]);
  const fetchFaculties = async () => {
    const { data, error } = await supabase.from('faculties').select('*');
    if (error) {
      console.log(error);
    }
    if (data) {
      setFaculties(data);
      // console.log(data);
    }
  };
  return (
    <CourseContext.Provider value={{ fetchFaculties, faculties }}>
      {children}
    </CourseContext.Provider>
  );
};
