import { createContext, useState } from 'react';
import supabase from '../config/supabaseClient';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [faculties, setFaculties] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const fetchFaculties = async () => {
    const { data, error } = await supabase.from('faculties').select('*');
    if (error) {
      setFetchError('Could not fetch the data');
      setFaculties([]);
      console.log(error);
    }
    if (data) {
      setFaculties(data);
      console.log(data);
      setFetchError(null);
    }
  };
  return (
    <CourseContext.Provider value={{ fetchFaculties, faculties }}>
      {children}
    </CourseContext.Provider>
  );
};
