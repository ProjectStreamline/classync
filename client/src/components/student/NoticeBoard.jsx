import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";

const NoticeBoard = () => {
  const { email } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const studentId = email.split("@")[0];
  const batch = studentId.substring(0, 4);
  const branch = studentId.substring(4, 7);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notices/student",
          {
            params: { batch, branch, studentId },
          }
        );
        setNotices(response.data.notices);
      } catch (error) {
        console.error("Error fetching notices", error);
      }
      ``;
    };
    fetchNotices();
  }, [batch, branch, studentId]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">NOTICE!</h2>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-yellow-100 p-4 mb-4 rounded-md shadow"
          >
            <p className="text-lg font-semibold">{notice.notice}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(notice.date).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No notices available.</p>
      )}
    </div>
  );
};

export default NoticeBoard;
