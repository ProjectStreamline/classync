import { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFloated, setIsFloated] = useState(
    () => localStorage.getItem('isFloated') || false
  );

  const courses = [
    { value: 'ABC123', label: 'Technical Communication' },
    { value: 'ABC456', label: 'PG&D' },
    { value: 'XYZ123', label: 'TAI' },
    { value: 'PQR123', label: 'NLUG' },
    { value: 'ABC567', label: 'D&M' },
    { value: 'XYZ234', label: 'FML' },
    { value: 'PQR567', label: 'PI' },
    { value: 'XYZ890', label: 'OC' },
    { value: 'PQR890', label: 'IND-IOT' },
    { value: 'ABC568', label: 'Robotics' },
    { value: 'XYZ305', label: 'DIP' },
    { value: 'PQR284', label: 'NNDL' },
  ];

  const slots = [
    {
      id: 'A',
    },
    {
      id: 'B',
    },
    {
      id: 'C',
    },
    {
      id: 'D',
    },
    {
      id: 'E',
    },
    {
      id: 'F',
    },
    {
      id: 'G',
    },
    {
      id: 'H',
    },
  ];

  const floatForm = () => {
    setIsFloated(true);
    localStorage.setItem('isFloated', JSON.stringify(true));
  };

  return (
    <FormContext.Provider value={{ floatForm, isFloated, slots, courses }}>
      {children}
    </FormContext.Provider>
  );
};
