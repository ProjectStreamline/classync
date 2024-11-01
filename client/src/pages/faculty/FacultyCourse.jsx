import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

export default function FacultyCourse() {
    const { course } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const CourseStudents = async () => {
            const { data, error } = await supabase
                .from(`${course}`)
                .select('student_id');
            
            if (data) {
                console.log(data);
                setStudents(data);
            } else if (error) {
                console.error("Error fetching students:", error);
            }
        };
        CourseStudents();
    }, [course]); // Add `course` as a dependency if it can change.

    return (
        <div>
            you are on {course}
            <ul>
                {students.map((student, index) => (
                    <li key={index}>{student.student_id}</li> 
                ))}
            </ul>
        </div>
    );
}
