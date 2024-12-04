import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";
import Cosmic3DNotice from "../../components/student/Cosmic3DNotice";

const NoticeBoard = () => {
  const { email } = useContext(AuthContext);
  const [notices, setNotices] = useState([]);
  const studentId = email ? email.split("@")[0] : "";
  const batch = studentId ? studentId.substring(0, 4) : "";
  const branch = studentId ? studentId.substring(4, 7) : "";

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/notices/student",
          {
            params: { batch, branch, studentId },
          }
        );

        const allNotices = response.data.notices;
        const relevantNotices = allNotices.filter((notice) => {
          return (
            notice.studentIds.includes(studentId) ||
            notice.studentIds.includes("all")
          );
        });

        setNotices(relevantNotices);
      } catch (error) {
        console.error("Error fetching notices", error);
      }
    };
    fetchNotices();
  }, [batch, branch, studentId]);

  return (
    <div className="p-8 bg-space-300 bg-opacity-80 rounded-lg shadow-lg backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-starlight font-space">
        NOTICE BOARD
      </h2>
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <Cosmic3DNotice
            key={notice._id}
            notice={notice.notice}
            date={new Date(notice.date).toLocaleDateString()}
            delay={index * 100}
          />
        ))
      ) : (
        <p className="text-starlight">No notices available.</p>
      )}
      <div className="mt-8"></div>
    </div>
  );
};

export default NoticeBoard;
