import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const Attendance = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState('');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchStudentsAndColumns = async () => {
      try {
        // Fetch students
        const { data: studentData, error: studentError } = await supabase
          .from(`${course}_attendance`)
          .select('student_id');

        if (studentError) {
          console.error('Error fetching students:', studentError);
        } else {
          setStudents(studentData);
        }

        // Fetch columns
        const { data: columnData, error: columnError } = await supabase.rpc(
          'get_columns',
          { p_table_name: `${course}_attendance` }
        );

        if (columnError) {
          console.error('Error fetching columns:', columnError);
        } else {
          const attendanceColumns = columnData
            .map((col) => col.col_name)
            .filter((col) => col !== 'student_id' && col !== 'id');
          setColumns(attendanceColumns);
        }

        // Fetch attendance data for each student
        const { data: rawAttendanceData, error: attendanceError } = await supabase
          .from(`${course}_attendance`)
          .select('*');

        if (attendanceError) {
          console.error('Error fetching attendance data:', attendanceError);
        } else {
          const formattedAttendance = rawAttendanceData.reduce((acc, row) => {
            const { student_id, ...dates } = row;

            // Convert boolean or null values to strings or empty strings
            const sanitizedDates = Object.entries(dates).reduce(
              (dateAcc, [key, value]) => {
                dateAcc[key] = value === true ? '1' : value === false ? '0' : '';
                return dateAcc;
              },
              {}
            );

            acc[student_id] = sanitizedDates;
            return acc;
          }, {});

          setAttendanceData(formattedAttendance);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudentsAndColumns();
  }, [course]);

  const handleInputChange = (studentId, date, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: {
        ...prevData[studentId],
        [date]: value === '1' ? '1' : '0',
      },
    }));
  };

  const handleKeyDown = (e, studentId, date) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentIndex = students.findIndex(
        (student) => student.student_id === studentId
      );
      const nextStudent = students[currentIndex + 1];
      if (nextStudent) {
        const nextInput = document.querySelector(
          `input[data-student-id="${nextStudent.student_id}"][data-date="${date}"]`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleAddColumn = async () => {
    if (!attendanceDate) {
      alert('Please select a date.');
      return;
    }

    const formattedDate = attendanceDate.replace(/-/g, '_');

    if (!columns.includes(formattedDate)) {
      try {
        const { error } = await supabase.rpc('add_attendance_column', {
          course_table: `${course}`,
          column_name: formattedDate,
          data_type: 'BOOLEAN',
        });

        if (error) {
          console.error('Error adding attendance column:', error);
          alert('Error adding column: ' + error.message);
        } else {
          setColumns((prevColumns) => [...prevColumns, formattedDate]);
        }
      } catch (error) {
        console.error('Error adding column:', error);
      }
    } else {
      alert('Column for this date already exists.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!attendanceDate) {
      alert('Please select a date.');
      return;
    }

    const formattedDate = attendanceDate.replace(/-/g, '_');

    for (const student of students) {
      const value = attendanceData[student.student_id]?.[formattedDate];

      const present = value === '0' || value === 0 ? 0 : 1;

      try {
        const { data: existingRecord, error: selectError } = await supabase
          .from(`${course}_attendance`)
          .select('*')
          .eq('student_id', student.student_id);

        if (selectError) {
          console.error('Error checking existing attendance:', selectError);
          continue;
        }

        if (existingRecord && existingRecord.length > 0) {
          const { error: updateError } = await supabase
            .from(`${course}_attendance`)
            .update({ [formattedDate]: present })
            .eq('student_id', student.student_id);

          if (updateError) {
            console.error('Error updating attendance:', updateError);
          }
        } else {
          const { error: insertError } = await supabase
            .from(`${course}_attendance`)
            .insert([
              {
                student_id: student.student_id,
                [formattedDate]: present,
              },
            ]);

          if (insertError) {
            console.error('Error inserting attendance data:', insertError);
          }
        }
      } catch (error) {
        console.error('Error submitting attendance:', error);
      }
    }

    alert('Attendance marked successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mark Attendance</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="attendanceDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Add column (select the date)
            </label>
            <div className="flex">
              <input
                type="date"
                id="attendanceDate"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              />
              <button
                type="button"
                onClick={handleAddColumn}
                className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Students</th>
                {columns.map((col) => (
                  <th key={col} className="border-b px-4 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td className="border-b px-4 py-2">{student.student_id}</td>
                  {columns.map((col) => (
                    <td key={col} className="border-b px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="1"
                        value={attendanceData[student.student_id]?.[col] || ''}
                        onChange={(e) =>
                          handleInputChange(
                            student.student_id,
                            col,
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(e, student.student_id, col)
                        }
                        data-student-id={student.student_id}
                        data-date={col}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0 or 1"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default Attendance;
