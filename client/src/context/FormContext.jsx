import { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFloated, setIsFloated] = useState(
    () => localStorage.getItem('isFloated') || false
  );

  const slots = [
    {
      id: 'A',
      courseOptions: [
        { value: 'ABC123', label: 'Technical Communication' },
        { value: 'ABC456', label: 'PG&D' },
      ],
    },
    {
      id: 'B',
      courseOptions: [
        { value: 'XYZ123', label: 'TAI' },
        { value: 'PQR123', label: 'NLUG' },
      ],
    },
    {
      id: 'C',
      courseOptions: [
        { value: 'ABC567', label: 'D&M' },
        { value: 'XYZ234', label: 'FML' },
      ],
    },
    {
      id: 'D',
      courseOptions: [{ value: 'PQR567', label: 'PI' }],
    },
    {
      id: 'E',
      courseOptions: [{ value: 'XYZ890', label: 'OC' }],
    },
    {
      id: 'F',
      courseOptions: [{ value: 'PQR890', label: 'IND-IOT' }],
    },
    {
      id: 'G',
      courseOptions: [
        { value: 'ABC568', label: 'Robotics' },
        { value: 'XYZ305', label: 'DIP' },
      ],
    },
    {
      id: 'H',
      courseOptions: [{ value: 'PQR284', label: 'NNDL' }],
    },
  ];

  const floatForm = () => {
    setIsFloated(true);
    localStorage.setItem('isFloated', JSON.stringify(true));
  };

  return (
    <FormContext.Provider value={{ floatForm, isFloated, slots }}>
      {children}
    </FormContext.Provider>
  );
};
