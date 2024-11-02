import { Link, useParams } from 'react-router-dom';

export default function FacultyCourse() {
  const { course } = useParams();

  return (
    <div>
      <p>you are on {course}</p>
      <Link to={`/faculty/dashboard/${course}/registered-students`}>
        Registered Students
      </Link>
      <Link to={`/faculty/dashboard/${course}/create-evaluation`}>
        Create Evaluation
      </Link>
      {/* <ul>
        {students.map((student, index) => (
          <li key={index}>{student.student_id}</li>
        ))}
      </ul> */}
    </div>
  );
}
