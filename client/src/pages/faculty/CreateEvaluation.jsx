import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import EnterMarks from '../../components/faculty/EnterMarks';

const CreateEvaluation = () => {
  const { course } = useParams();
  const [evalName, setEvalName] = useState('');
  const [maxMarks, setMaxMarks] = useState(0);
  const [columnName, setColumnName] = useState('');
  console.log(evalName + '/' + maxMarks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(evalName, maxMarks);
    if (!evalName || !maxMarks) {
      alert('All the fields are required.');
      return;
    }
    // setColumnName(evalName + '/' + maxMarks);
    try {
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
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  return (
    <div>
      <h1>Evaluation</h1>
      <div>
        <p>Add evaluation</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">evaluation name</label>
            <input
              type="text"
              name="name"
              value={evalName}
              className="border border-black"
              onChange={(e) => setEvalName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="marks">evaluation marks</label>
            <input
              type="text"
              name="marks"
              value={maxMarks}
              className="border border-black"
              onChange={(e) => setMaxMarks(e.target.value)}
            />
          </div>
          <button type="submit">Add evaluation</button>
        </form>
      </div>
      <EnterMarks />
    </div>
  );
};

export default CreateEvaluation;
