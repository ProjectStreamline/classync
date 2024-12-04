import  { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";


function Backlogs() {
  const [backlogs, setBacklogs] = useState([]); 
  const [newEntry, setNewEntry] = useState({
    student_id: "",
    slot: "",
    course_name: "",
  }); 


  const fetchBacklogs = async () => {
    const { data, error } = await supabase
      .from("backlog")
      .select("*");

    if (error) {
      console.error("Error fetching backlogs:", error.message);
    } else {
      setBacklogs(data);
    }
  };


  useEffect(() => {
    fetchBacklogs();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddEntry = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("backlog")
      .insert([newEntry]);

    if (error) {
      console.error("Error adding new entry:", error.message);
    } else {
      setNewEntry({ student_id: "", slot: "", course_name: "" }); 
      fetchBacklogs(); 
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Backlogs Table</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b">Student ID</th>
              <th className="py-3 px-4 border-b">Slot</th>
              <th className="py-3 px-4 border-b">Course Name</th>
            </tr>
          </thead>
          <tbody>
            {backlogs.map((backlog, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{backlog.student_id}</td>
                <td className="py-3 px-4 border-b">{backlog.slot}</td>
                <td className="py-3 px-4 border-b">{backlog.course_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Add to Backlogs</h3>
      <form onSubmit={handleAddEntry} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-gray-700 font-medium">
            Student ID:
            <input
              type="text"
              name="student_id"
              value={newEntry.student_id}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Slot:
            <input
              type="text"
              name="slot"
              value={newEntry.slot}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Course Name:
            <input
              type="text"
              name="course_name"
              value={newEntry.course_name}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Add Entry
        </button>
      </form>
    </div>
  );
}

export default Backlogs;
