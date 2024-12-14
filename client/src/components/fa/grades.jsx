import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';

function Grades() {
    const [loading, setLoading] = useState(false);
    const [cgpaData, setCgpaData] = useState([]);

    const fetchCgpaData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('cgpa')
            .select('*');

        if (error) {
            console.error('Error fetching CGPA data:', error);
        } else {
            setCgpaData(data);
        }

        setLoading(false);
    };

    const handleButtonClick = async () => {
        setLoading(true);

        // Step 3: Populate the cgpa table with data from each course table
        const { error: populateError } = await supabase.rpc('populate_cgpa');

        if (populateError) {
            console.error('Error populating CGPA table:', populateError);
        } else {
            console.log('Successfully populated CGPA table.');
            fetchCgpaData(); // Refresh data after populating
        }
    };

const handleCalculateCgpa = async () => {
    setLoading(true);

    // Step 4: Calculate CGPA for each student and update the cgpa column
    const updatedCgpaData = cgpaData.map(async (student) => {
        const { id, student_id, cgpa, ...courses } = student;  // Destructure and exclude cgpa

        // Log the student data and course grades
        console.log(`Student ID: ${student_id}`);
        console.log("Course Grades (excluding CGPA):", courses);

        // Calculate the sum of the grades from the course columns
        const totalGrade = Object.values(courses).reduce((sum, grade) => sum + grade, 0);
        console.log("Total Grade Sum:", totalGrade);

        // Calculate CGPA and round to two decimal places using Math.round
        const calculatedCgpa = Math.round((totalGrade / 18) * 100) / 100; // Round to 2 decimal places
        console.log("Calculated CGPA:", calculatedCgpa);

        // Update the cgpa in the database
        const { error } = await supabase
            .from('cgpa')
            .update({ cgpa: calculatedCgpa })
            .match({ id });

        if (error) {
            console.error(`Error updating CGPA for student ${student_id}:`, error);
        }
    });

    // Wait for all CGPA calculations to complete
    await Promise.all(updatedCgpaData);

    // Fetch the updated data
    fetchCgpaData();

    setLoading(false);
};





    useEffect(() => {
        fetchCgpaData(); // Initial fetch when the component mounts
    }, []);

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-center space-x-4">
                {loading ? (
                    <div className="text-xl text-gray-700">Table is being populated with grade points...</div>
                ) : (
                    <>
                        <button
                            onClick={handleButtonClick}
                            disabled={loading}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                        >
                          Populate CGPA
                        </button>
                        <button
                            onClick={handleCalculateCgpa}
                            disabled={loading || cgpaData.length === 0}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                        >
                            Calculate CGPA
                        </button>
                    </>
                )}
            </div>

            {!loading && cgpaData.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">CGPA</th>
                                {/* Dynamically generate table headers for each course */}
                                {cgpaData[0] && Object.keys(cgpaData[0]).map((key, index) => {
                                    if (key !== 'id' && key !== 'student_id' && key !== 'cgpa') {
                                        return (
                                            <th key={index} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                                {key}
                                            </th>
                                        );
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {cgpaData.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="px-4 py-2 text-sm text-gray-600">{row.student_id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{row.cgpa}</td>

                                    {Object.keys(row).map((key, index) => {
                                        if (key !== 'id' && key !== 'student_id' && key !== 'cgpa') {
                                            return (
                                                <td key={index} className="px-4 py-2 text-sm text-gray-600">
                                                    {row[key]}
                                                </td>
                                            );
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {cgpaData.length === 0 && !loading && (
                <div className="text-center text-gray-500">No data available.</div>
            )}
        </div>
    );
}

export default Grades;
