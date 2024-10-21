import React from 'react';
import FaNavbar from '../../components/fa/FaNavbar';
import Courses from '../../components/fa/Courses';
import Faculties from '../../components/fa/Faculties';

const FaDashboard = () => {
  return (
    <div className="flex">
      <FaNavbar />
      <Courses />
      <Faculties />
    </div>
  );
};

export default FaDashboard;
