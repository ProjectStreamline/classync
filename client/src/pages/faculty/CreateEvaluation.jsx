import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import EnterMarks from '../../components/faculty/EnterMarks';

const CreateEvaluation = () => {
  const { course } = useParams();
  const [evalName, setEvalName] = useState('');
  const [maxMarks, setMaxMarks] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!evalName || !maxMarks) {
      alert('All the fields are required.');
      return;
    }
    try {
      // Adding column in course table
      const { data, error } = await supabase.rpc('add_evaluation_column', {
        course_table: course,
        column_name: evalName,
        data_type: 'integer',
      });
      if (error) {
        console.error('Error adding column:', error);
      } else {
        console.log('Evaluation column added:', data);
      }

      // Updating evaluations table
      const { data: evalData, error: evalError } = await supabase
        .from('evaluations')
        .insert([
          {
            eval_name: evalName,
            course_name: course,
            max_marks: maxMarks,
          },
        ]);

      if (evalError) {
        console.error('Error adding evaluation:', evalError);
      } else {
        console.log('Evaluation added:', evalData);
        setEvalName('');
        setMaxMarks(0);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Evaluation</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="text-lg font-semibold text-gray-700 mb-4">Add Evaluation</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Evaluation Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={evalName}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEvalName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="marks"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Evaluation Marks
            </label>
            <input
              type="text"
              name="marks"
              id="marks"
              value={maxMarks}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMaxMarks(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Evaluation
          </button>
        </form>
      </div>
      <EnterMarks />
    </div>
  );
};

export default CreateEvaluation;
