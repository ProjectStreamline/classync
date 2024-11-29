import { Link, useParams } from 'react-router-dom';

export default function FacultyCourse() {
  const { course } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <p className="text-2xl font-bold text-gray-800 mb-4">
        You are on <span className="text-blue-600">{course}</span>
      </p>
      <div className="flex flex-col gap-4">
        <Link
          to={`/faculty/dashboard/${course}/registered-students`}
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        >
          Registered Students
        </Link>
        <Link
          to={`/faculty/dashboard/${course}/create-evaluation`}
          className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
        >
          Create Evaluation
        </Link>
      </div>
    </div>
  );
}
