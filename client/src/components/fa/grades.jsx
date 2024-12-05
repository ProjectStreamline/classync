import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';




function Grades() {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        setLoading(true);

    

        // Step 3: Populate the cgpa table with data from each course table
        const { error: populateError } = await supabase.rpc('populate_cgpa');

        if (populateError) {
            console.error('Error populating CGPA table:', populateError);
        } else {
            console.log('Successfully populated CGPA table.');
        }
    }

;

  return (
    <div>
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? '' : 'Create and Populate CGPA'}
      </button>
    </div>
  );

}

export default Grades;
