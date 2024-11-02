import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const RegisteredStudents = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  console.log(course);

  useEffect(() => {
    const CourseStudents = async () => {
      const { data, error } = await supabase
        .from(`${course}`)
        .select('student_id');

      if (data) {
        console.log(data);
        setStudents(data);
      } else if (error) {
        console.error('Error fetching students:', error);
      }
    };
    CourseStudents();
  }, [course]);

  return (
    <div>
      <p>{course}</p>
      <h1>registered students</h1>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.student_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredStudents;
