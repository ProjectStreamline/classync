import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const EnterMarks = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [marks, setMarks] = useState({});
  useEffect(() => {
    const CourseStudents = async () => {
      try {
        //column names
        const { data: columnData, error: columnError } = await supabase.rpc(
          'get_columns',
          { p_table_name: course }
        );
        if (columnData) {
          console.log(columnData);
        }
        if (columnError) {
          console.log(columnError);
        }
        // Filter columns to exclude 'student_id' and 'id'
        const evalColumns = columnData
          .map((col) => col.col_name)
          .filter((col) => col !== 'student_id' && col !== 'id');
        setEvaluations(evalColumns);
        console.log(evalColumns);

        //students list
        let { data: courseData, error: courseError } = await supabase
          .from(`${course}`)
          .select('*');

        if (courseData) {
          console.log(courseData);
          setStudents(courseData);
        } else if (courseError) {
          console.error('Error fetching students:', courseError);
        }
        //students list
        const studentList = courseData.map((row) => ({
          student_id: row.student_id,
        }));
        setStudents(studentList);

        const marksData = {};
        courseData.forEach((row) => {
          marksData[row.student_id] = {};
          evalColumns.forEach((evalName) => {
            marksData[row.student_id][evalName] = row[evalName] || '';
          });
        });
        setMarks(marksData);
      } catch (error) {
        console.error('Error fetching schema or data:', error);
      }
    };
    CourseStudents();
  }, [course]);
  const handleMarkChange = (studentId, evalName, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [evalName]: value,
      },
    }));
  };
  const handleMarkSubmit = async (studentId, evalName) => {
    const mark = marks[studentId]?.[evalName];
    if (mark === undefined) return;

    try {
      const { error } = await supabase
        .from(course) // Use course name as table name
        .update({ [evalName]: mark })
        .match({ student_id: studentId });

      if (error) throw error;
      console.log('Mark submitted successfully');
    } catch (error) {
      console.error('Error submitting mark:', error);
    }
  };

  const handleEnterKey = (e, studentId, evalName, studentIndex) => {
    if (e.key === 'Enter') {
      handleMarkSubmit(studentId, evalName);
      const nextStudentIndex = studentIndex + 1;

      if (nextStudentIndex < students.length) {
        const nextStudentId = students[nextStudentIndex].student_id;
        const nextInput = document.getElementById(
          `input-${nextStudentId}-${evalName}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  return (
    <div>
      <p>EnterMarks</p>
      <table className="border border-collapse">
        <thead>
          <tr>
            <th>Students</th>
            {evaluations.map((evalName) => (
              <th key={evalName}>{evalName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, studentIndex) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              {evaluations.map((evalName) => (
                <td key={evalName}>
                  <input
                    id={`input-${student.student_id}-${evalName}`}
                    type="number"
                    value={marks[student.student_id]?.[evalName] || ''}
                    onChange={(e) =>
                      handleMarkChange(
                        student.student_id,
                        evalName,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleEnterKey(
                        e,
                        student.student_id,
                        evalName,
                        studentIndex
                      )
                    }
                    className="border p-1"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnterMarks;
