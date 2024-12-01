import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const EnterMarks = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [marks, setMarks] = useState({});
  const [maxMarks, setMaxMarks] = useState(0);
  const [evalName, setEvalName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CourseStudents = async () => {
      try {
        // Fetch columns for evaluation
        const { data: columnData, error: columnError } = await supabase.rpc(
          'get_columns',
          { p_table_name: course }
        );
        if (columnError) throw columnError;
        const evalColumns = columnData
          .map((col) => col.col_name)
          .filter((col) => col !== 'student_id' && col !== 'id');
        setEvaluations(evalColumns);

        // Fetch students and their marks
        let { data: courseData, error: courseError } = await supabase
          .from(course)
          .select('*');

        if (courseError) throw courseError;

        const studentList = courseData.map((row) => ({
          student_id: row.student_id,
        }));
        setStudents(studentList);

        // Initialize marks state for each student and evaluation column
        const marksData = {};
        courseData.forEach((row) => {
          marksData[row.student_id] = {};
          evalColumns.forEach((evalName) => {
            marksData[row.student_id][evalName] = row[evalName] || '';
          });
        });
        setMarks(marksData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching schema or data:', error);
        setLoading(false);
      }
    };

    CourseStudents();
  }, [course]);

  const fetchEvaluations = async () => {
    const { data, error } = await supabase
      .from('evaluations')
      .select('max_marks')
      .eq('course_name', course)
      .eq('eval_name', evalName);

    if (error) {
      console.error('Error fetching evaluations:', error);
    }
    if (data) {
      setMaxMarks(data[0].max_marks);
    }
  };

  useEffect(() => {
    if (evalName) {
      fetchEvaluations();
    }
  }, [evalName]);

  const handleMarkChange = (studentId, evalName, value) => {
    setEvalName(evalName);
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
    if (mark > maxMarks) {
      alert('Marks cannot be greater than max marks');
      return;
    }
    if (mark === undefined) return;

    try {
      const { error } = await supabase
        .from(course)
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

  // Calculate total marks for each student
  const calculateTotalMarks = (studentId) => {
    const studentMarks = marks[studentId];
    if (!studentMarks) return 0;

    let total = 0;
    Object.values(studentMarks).forEach((mark) => {
      total += parseFloat(mark) || 0; // Handle empty or non-numeric values gracefully
    });
    return total;
  };


const saveTotalMarks = async () => {
  try {
    // Call the RPC to add the `totals` column if it doesn't exist
    const { error: rpcError } = await supabase.rpc('add_totals_column', {
      tab: course,
    });
    if (rpcError) throw rpcError;

    // Wait a bit for the column to be created before updating total marks
    setTimeout(async () => {
      try {
        const updatedStudents = [...students]; // Create a copy of the students array
        
        for (const student of students) {
          const totalMarks = calculateTotalMarks(student.student_id);

          // Fetch the current total_marks from the database
          const { data, error } = await supabase
            .from(course)
            .select('totals')
            .eq('student_id', student.student_id)
            .single();

          if (error) throw error;

          // Only update if the total marks have changed
          if (data && data.totals !== totalMarks) {
            // Update the total marks for the student in the table
            const { error: updateError } = await supabase
              .from(course)
              .update({ totals: totalMarks })
              .match({ student_id: student.student_id });

            if (updateError) throw updateError;

            // Update the state to reflect the new total marks
            const studentIndex = updatedStudents.findIndex(
              (s) => s.student_id === student.student_id
            );
            if (studentIndex !== -1) {
              updatedStudents[studentIndex] = {
                ...updatedStudents[studentIndex],
                total_marks: totalMarks,
              };
            }
          }
        }

        // After updating the database, update the state to trigger re-render
        setStudents(updatedStudents); // This will trigger a re-render

        console.log('Total marks saved successfully');

        // Reload the page after saving total marks
        window.location.reload(); // This will refresh the page
      } catch (error) {
        console.error('Error saving total marks:', error);
      }
    }, 1000); // Adding a 1-second delay to ensure column creation completes before updating marks

  } catch (error) {
    console.error('Error adding total_marks column:', error);
  }
};




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-2xl font-bold text-gray-800 mb-6">Enter Marks</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Students</th>
              {evaluations.map((evalName) => (
                <th key={evalName} className="border border-gray-300 px-4 py-2 text-left">
                  {evalName}
                </th>
              ))}
             
            </tr>
          </thead>
          <tbody>
            {students.map((student, studentIndex) => (
              <tr key={student.student_id} className="odd:bg-gray-50 even:bg-white">
                <td className="border border-gray-300 px-4 py-2">
                  {student.student_id}
                </td>
                {evaluations.map((evalName) => (
                  <td key={evalName} className="border border-gray-300 px-4 py-2">
                    <input
                      id={`input-${student.student_id}-${evalName}`}
                      type="number"
                      value={marks[student.student_id]?.[evalName] || ''}
                      onChange={(e) =>
                        handleMarkChange(student.student_id, evalName, e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleEnterKey(e, student.student_id, evalName, studentIndex)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                ))}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={saveTotalMarks}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Calculate Total Marks
      </button>
    </div>
  );
};

export default EnterMarks;
