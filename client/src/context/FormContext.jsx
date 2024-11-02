import React, { createContext, useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFloated, setIsFloated] = useState(false);

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [semester, setSemester] = useState(7);
  const fetchIsFloated = async () => {
    const { data, error } = await supabase
      .from('form_status')
      .select('isFloated')
      .eq('semester', semester)
      .single();

    if (error) {
      console.log('error fetching isFloated', error);
    }
    if (data) {
      console.log(data.isFloated);
      setIsFloated(data.isFloated);
    }
  };

  useEffect(() => {
    fetchIsFloated();
  }, []);

  const toggleIsFloated = async () => {
    const newIsFloated = !isFloated;
    setIsFloated(newIsFloated);

    const { data, error } = await supabase
      .from('form_status')
      .update({ isFloated: newIsFloated })
      .eq('semester', semester);

    if (error) {
      console.log('error updating isFloated', error);
    }
  };

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
  const [slots, setSlots] = useState([
    { id: 'A', courseOptions: [] },
    { id: 'B', courseOptions: [] },
    { id: 'C', courseOptions: [] },
    { id: 'D', courseOptions: [] },
    { id: 'E', courseOptions: [] },
    { id: 'F', courseOptions: [] },
    { id: 'G', courseOptions: [] },
    { id: 'H', courseOptions: [] },
  ]);

  const fetchCoursesForSlot = async (slotId) => {
    const { data, error } = await supabase.from(`slot_${slotId}`).select('*');
    if (error) {
      console.error(`Error fetching courses for slot ${slotId}:`, error);
      return [];
    }
    return data.map((course) => ({
      value: course.course_id,
      label: course.course_name,
    }));
  };

  const fetchAllSlots = async () => {
    const updatedSlots = await Promise.all(
      slots.map(async (slot) => {
        const courseOptions = await fetchCoursesForSlot(slot.id);
        return { ...slot, courseOptions };
      })
    );
    setSlots(updatedSlots);
  };

  useEffect(() => {
    fetchAllSlots();
  }, []);

  return (
    <FormContext.Provider
      value={{
        isFloated,
        toggleIsFloated,
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
