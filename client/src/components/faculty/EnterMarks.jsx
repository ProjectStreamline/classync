import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnterMarks = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [marks, setMarks] = useState({});
  const [maxMarks, setMaxMarks] = useState(0);
  const [evalName, setEvalName] = useState('');
  const [loading, setLoading] = useState(true);
  const [cutoffs, setCutoffs] = useState({});

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

        //filter totals and move to the end
        const sortedEvalColumns = evalColumns.filter(
          (col) =>
            col !== 'grades' && col !== 'totals' && col !== 'grade_pointer'
        );
        if (evalColumns.includes('totals')) sortedEvalColumns.push('totals');
        if (evalColumns.includes('grades')) sortedEvalColumns.push('grades');

        setEvaluations(sortedEvalColumns);

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

  useEffect(() => {
    const fetchCutoffs = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('AA, AB, BB, BC, CC, CD, DD, FF')
          .eq('course_name', course)
          .single();

        if (error) {
          console.error('Error fetching cutoffs:', error);
        } else {
          setCutoffs(data);
        }
      } catch (error) {
        console.error('Error fetching cutoffs:', error);
      }
    };

    fetchCutoffs();
  }, [course, setCutoffs]);

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

  const handleMarkSubmit = async () => {
    try {
      const updates = Object.keys(marks).map((studentId) => {
        const studentMarks = marks[studentId];
        return {
          student_id: studentId,
          ...studentMarks,
        };
      });

      for (const update of updates) {
        const { student_id, ...evalMarks } = update;

        const { error } = await supabase
          .from(course)
          .update(evalMarks)
          .match({ student_id });

        if (error) throw error;
      }

      toast.success('All marks submitted successfully');
      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.error('Error submitting marks:', error);
      toast.error('Error submitting marks');
    }
  };

  const handleEnterKey = (e, studentId, evalName, studentIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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

  const [totalsColumnExists, setTotalsColumnExists] = useState(false);

const checkTotalsColumn = async () => {
  try {
    const { data, error } = await supabase
      .from(course)
      .select('totals')
      .limit(1)
      .single(); // Try to fetch a single record

    if (error) throw error;

    if (data && data.totals !== null) {
      setTotalsColumnExists(true); // Set to true if the column exists
    } else {
      setTotalsColumnExists(false); // Set to false if the column doesn't exist
    }
  } catch (error) {
    console.error('Error checking totals column:', error);
    setTotalsColumnExists(false);
  }
};

useEffect(() => {
  checkTotalsColumn(); // Call the check on component mount
}, []);

const saveTotalMarks = async () => {
  if (totalsColumnExists) {
    console.log('Total marks column already exists. No need to calculate.');
    return; // Prevent the function from running if the column exists
  }

  try {
    const { error: rpcError } = await supabase.rpc('add_totals_column', {
      tab: course,
    });
    if (rpcError) throw rpcError;

    // Continue with the rest of the logic as you currently have
    setTimeout(async () => {
      try {
        const updatedStudents = [...students];
        for (const student of students) {
          const { data, error } = await supabase
            .from(course)
            .select('totals')
            .eq('student_id', student.student_id)
            .single();

          if (error) throw error;
          const totalMarks = calculateTotalMarks(student.student_id);

          if (data && data.totals !== totalMarks) {
            const { error: updateError } = await supabase
              .from(course)
              .update({ totals: totalMarks })
              .match({ student_id: student.student_id });

            if (updateError) throw updateError;

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

        setStudents(updatedStudents); // Trigger re-render
        console.log('Total marks saved successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error saving total marks:', error);
      }
    }, 1000);
  } catch (error) {
    console.error('Error adding total_marks column:', error);
  }
};

  let labstate;

const test = async () => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('lab')
      .eq('course_name', course)
      .single();

    if (error) {
      console.error('Error fetching lab status:', error.message);
      labstate = null; 
    } else {
      
      labstate = data.lab; 
      console.log('Lab status:', labstate); 
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    labstate = null; 
  }
};


test().then(() => {
  console.log('Lab status stored in labstate:', labstate);
});

  const calculateGrade = (student_id, totalMarks, cutoffs) => {
    if (!cutoffs) {
      console.error('Cutoffs are undefined or null');
      return 'FF';
    }

    const numericTotalMarks = Number(totalMarks);
    if (isNaN(numericTotalMarks)) {
      console.error(
        `Total marks for student ${student_id} is not a number:`,
        totalMarks
      );
      return 'FF';
    }

    let grade;
    let pointer;

  
  
    if (numericTotalMarks >= cutoffs.AA) {
      grade = 'AA';
      if (labstate){
        pointer = 10 * 4;
      } else {
        pointer = 10 * 3;
      }
      
    } else if (numericTotalMarks >= cutoffs.AB) {
      grade = 'AB';
   if (labstate){
        pointer = 9 * 4;
      } else {
        pointer = 9 * 3;
      }
    } else if (numericTotalMarks >= cutoffs.BB) {
      grade = 'BB';
     if (labstate){
        pointer = 8 * 4;
      } else {
        pointer = 8 * 3;
      }
    } else if (numericTotalMarks >= cutoffs.BC) {
      grade = 'BC';
      if (labstate){
        pointer = 7 * 4;
      } else {
        pointer = 7 * 3;
      }
    } else if (numericTotalMarks >= cutoffs.CC) {
      grade = 'CC';
      if (labstate){
        pointer = 6 * 4;
      } else {
        pointer = 6 * 3;
      }
    } else if (numericTotalMarks >= cutoffs.CD) {
      grade = 'CD';
 if (labstate){
        pointer = 5 * 4;
      } else {
        pointer = 5 * 3;
      }
    } else if (numericTotalMarks >= cutoffs.DD) {
      grade = 'DD';
    if (labstate){
        pointer = 4 * 4;
      } else {
        pointer = 4 * 3;
      }
    } else {
      grade = 'FF';
      pointer = 0;
    }

    console.log(
      `Student ${student_id} has total marks: ${numericTotalMarks} and grade: ${grade}`
    );
    // return grade;

    return { grade, pointer };
  };

  const saveGrades = async () => {
    try {
      //call rpc function
      const { error: rpcError } = await supabase.rpc('add_grades_column', {
        tab: course,
      });
      if (rpcError) throw rpcError;

      const { error: rpcError1 } = await supabase.rpc(
        'add_grade_pointer_column',
        {
          tab: course,
        }
      );
      if (rpcError1) throw rpcError1;

      //wait a bit for the column to be created
      setTimeout(async () => {
        try {
          const updatedStudents = [...students]; // Create a copy of the students array

          for (const student of students) {
            const { data: totalMarksData, error } = await supabase
              .from(course)
              .select('totals')
              .eq('student_id', student.student_id)
              .single();

            if (error) throw error;

            const totalMarks = totalMarksData?.totals;

            if (totalMarks === undefined || totalMarks === null) {
              console.error(
                `Total marks for student ${student.student_id} is not valid:`,
                totalMarksData
              );
              continue;
            }

            if (error) throw error;

            const { grade, pointer } = calculateGrade(
              student.student_id,
              totalMarks,
              cutoffs
            );

            const { data, error: updateError } = await supabase
              .from(course)
              .update({ grades: grade })
              .match({ student_id: student.student_id });
            if (updateError) throw updateError;

            const { data: pointerData, error: pointerError } = await supabase
              .from(course)
              .update({ grade_pointer: pointer })
              .match({ student_id: student.student_id });
            if (pointerError) throw pointerError;

            const studentIndex = updatedStudents.findIndex(
              (s) => s.student_id === student.student_id
            );
            if (studentIndex !== -1) {
              updatedStudents[studentIndex] = {
                ...updatedStudents[studentIndex],
                grade: grade,
              };
            }
          }
          setStudents(updatedStudents); // This will trigger a re-render

          toast.success('Grades saved successfully');
          // Reload the page after saving grades
          window.location.reload();
        } catch (error) {
          console.error('Error saving grades:', error);
          toast.error('Error saving grades');
        }
      }, 1000);
    } catch (error) {}
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="p-6 min-h-screen">
      <p className="text-2xl font-bold text-gray-800 mb-6">Enter Marks</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Students
              </th>
              {evaluations.map((evalName) => (
                <th
                  key={evalName}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {evalName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, studentIndex) => (
              <tr
                key={student.student_id}
                className="odd:bg-gray-50 even:bg-white"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {student.student_id}
                </td>
                {evaluations.map((evalName) => (
                  <td
                    key={evalName}
                    className="border border-gray-300 px-4 py-2"
                  >
                    <input
                      id={`input-${student.student_id}-${evalName}`}
                      // type="number"
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
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full">
        <button
          onClick={handleMarkSubmit}
          className="mt-4 mr-1 px-6 py-2 bg-blue-500 text-white rounded-md flex-1"
        >
          Submit Marks
        </button>
        <div>
    {!totalsColumnExists && (
      <button
        onClick={saveTotalMarks}
        className="mt-4 ml-1 px-6 py-2 bg-blue-500 text-white rounded-md flex-1"
      >
        Calculate Total Marks
      </button>
    )}
  </div>
        <button
          onClick={saveGrades}
          className="mt-4 ml-1 px-6 py-2 bg-blue-500 text-white rounded-md flex-1"
        >
          Calculate Grades
        </button>
      </div>
      <ToastContainer />
      </div>

  );
};

export default EnterMarks;
