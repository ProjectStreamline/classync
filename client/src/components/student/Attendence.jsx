import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';

function AttendenceX() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all tables with 'attendance' in their names
    useEffect(() => {
        const fetchAttendanceTables = async () => {
            const { data, error } = await supabase.rpc('get_tables_with_attendance');

            if (error) {
                console.error("Error fetching tables:", error);
            } else {
                setTables(data);
            }
            setLoading(false);
        };

        fetchAttendanceTables();
    }, []);

    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Attendance Tables</h1>

            {loading ? (
                <p>Loading tables...</p>
            ) : (
                <div className="space-y-4">
                    {tables.length === 0 ? (
                        <p>No attendance tables found.</p>
                    ) : (
                        tables.map((table, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
                            >
                                <h2 className="text-xl font-semibold">{table.name}</h2>
                                {/* You can add more information about each table here */}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default AttendenceX;
