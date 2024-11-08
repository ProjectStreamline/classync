import React, { useState } from "react";
import FaNavbar from "../../components/fa/FaNavbar";
import NoticeModal from "../../components/fa/NoticeModal";

const GenerateNotice = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex">
      <FaNavbar />
      {isModalOpen && <NoticeModal onClose={closeModal} />}
    </div>
  );
};

export default GenerateNotice;
