import React, { useState } from "react";
import axios from "axios";

const Modal = ({ onClose }) => {
  const [batch, setBatch] = useState("bt21");
  const [branch, setBranch] = useState("ece");
  const [studentIds, setStudentIds] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle sending the notice
  const handleSendNotice = async () => {
    // Extract the student ID without the email domain
    const idsArray = studentIds.split(",").map((id) => id.trim().split("@")[0]);

    // Regular expression pattern to validate student IDs
    const pattern = new RegExp(`^${batch}${branch}(0[0-9]{2}|1[01][0-9]|130)$`);

    // Filter out invalid student IDs
    const invalidIds = idsArray.filter((id) => !pattern.test(id));

    if (invalidIds.length > 0) {
      // Show error message if there are invalid IDs
      setErrorMessage(
        `Invalid IDs for batch ${batch} and branch ${branch}: ${invalidIds.join(
          ", "
        )}`
      );
    } else {
      setErrorMessage("");
      try {
        // Sending the POST request to the backend
        const response = await axios.post("http://localhost:5000/api/notices", {
          batch,
          branch,
          studentIds: idsArray,
          notice: noticeContent,
        });

        if (response.status === 201) {
          alert("Notice sent successfully!");
          onClose(); // Close the modal after successful submission
        }
      } catch (error) {
        console.error("Error sending notice:", error);
        setErrorMessage("Failed to send notice. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Generate Notice</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-2 font-medium text-gray-700">
            Select Batch:
          </label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>bt21</option>
            <option>bt22</option>
            <option>bt23</option>
            <option>bt24</option>
            <option>bt25</option>
          </select>

          <label className="block mb-2 font-medium text-gray-700">
            Send to:
          </label>
          <input
            type="text"
            placeholder="Enter student IDs, separated by commas"
            value={studentIds}
            onChange={(e) => setStudentIds(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Select Branch:
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>ece</option>
            <option>cse</option>
          </select>

          <label className="block mb-2 font-medium text-gray-700">
            Notice Content:
          </label>
          <textarea
            placeholder="Write your notice here..."
            value={noticeContent}
            onChange={(e) => setNoticeContent(e.target.value)}
            className="w-full h-32 p-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-auto"
          ></textarea>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={handleSendNotice}
            className="w-full mt-4 py-2 bg-black text-white font-semibold rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
