import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import EnterMarks from '../../components/faculty/EnterMarks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEvaluation = () => {
  const { course } = useParams();
  const [evalName, setEvalName] = useState('');
  const [maxMarks, setMaxMarks] = useState(0);
  const [cutoffs, setCutoffs] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!evalName || !maxMarks) {
      toast.error('All the fields are required.');
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
        toast.success('Evaluation added:', evalData);
        setEvalName('');
        setMaxMarks(0);
      }
      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Unexpected error');
    }
  };

  const handleCutoffChange = (grade, value) => {
    setCutoffs((prev) => ({ ...prev, [grade]: Number(value) }));
  };

  const saveCutoffsToBackend = async () => {
    try {
      const updates = {};
      for (const [grade, cutoff] of Object.entries(cutoffs)) {
        updates[grade] = cutoff; // Use the grade name as the column name
      }

      const { error } = await supabase
        .from('courses')
        .update(updates)
        .eq('course_name', course);

      if (error) throw error;

      toast.success('Cutoffs saved successfully!');
    } catch (error) {
      toast.error('Error saving cutoffs:', error);
      toast.error('error saving cutoffs:');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create Evaluation
      </h1>
      <div className="flex w-full p-6 m-auto">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex-1 mr-2">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Add Evaluation
          </p>
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
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex-1 ml-2">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Set Grade Cutoffs
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {['AA', 'AB', 'BB', 'BC', 'CD', 'CC', 'DD', 'FF'].map((grade) => (
              <div key={grade} className="flex items-center">
                <label className="w-1/4 font-medium">{grade}:</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-2 w-1/2"
                  value={cutoffs[grade] || ''}
                  onChange={(e) => handleCutoffChange(grade, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={saveCutoffsToBackend}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Save Cutoffs
          </button>
        </div>
      </div>

      <EnterMarks />
      <ToastContainer />
    </div>
  );
};

export default CreateEvaluation;
