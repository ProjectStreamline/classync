import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { courseCode } = useParams();
  console.log(courseCode);
  return <div>CourseDetails: {courseCode}</div>;
};

export default CourseDetails;
