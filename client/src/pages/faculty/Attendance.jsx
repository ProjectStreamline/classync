import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const Attendance = () => {
  const { course } = useParams();
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState('');
  const [columns, setColumns] = useState([]);
  const [columnExists, setColumnExists] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data: studentData, error } = await supabase
        .from(course + '_attendance')
        .select('student_id');

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        setStudents(studentData);
      }
    };

    fetchStudents();
  }, [course]);

  const handleDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  const handleInputChange = (studentId, date, value) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: {
        ...prevData[studentId],
        [date]: value,
      },
    }));
  };

  const handleAddColumn = async () => {
    if (!attendanceDate) {
      alert('Please select a date.');
      return;
    }

    // Format the date to a valid column name
    const formattedDate = attendanceDate.replace(/-/g, '_');

    // Add the new column if it doesn't already exist
    if (!columnExists) {
      const { data, error } = await supabase.rpc('add_attendance_column', {
        course_table: course,
        column_name: formattedDate,
        data_type: 'BOOLEAN',
      });

      if (error) {
        console.error('Error adding attendance column:', error);
      } else {
        setColumnExists(true);
        setColumns((prevColumns) => [...prevColumns, formattedDate]);
        console.log('Attendance column added:', data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!attendanceDate) {
      alert('Please select a date.');
      return;
    }

    const formattedDate = attendanceDate.replace(/-/g, '_');

    // Insert or update attendance data for each student
    for (const student of students) {
      const present = attendanceData[student.student_id]
        ? attendanceData[student.student_id][formattedDate]
        : 0;

      const { data, error } = await supabase
        .from(course + '_attendance')
        .upsert([
          {
            student_id: student.student_id,
            [formattedDate]: present ? 1 : 0,
          },
        ]);

      if (error) {
        console.error('Error inserting attendance data:', error);
      } else {
        console.log('Attendance data inserted:', data);
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
                onChange={handleDateChange}
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
                {/* <th className="border-b px-4 py-2 text-left">
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    +
                  </button>
                </th> */}
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
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
