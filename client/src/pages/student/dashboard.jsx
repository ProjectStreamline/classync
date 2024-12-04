// import React, { useState, useEffect } from "react";
// import Header from "../../components/student/Header";
// import NoticeBoard from "../../components/student/NoticeBoard";

// export default function Dashboard() {
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.pageYOffset > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-space-400 to-space-300 text-starlight font-space">
//       <Header />
//       <div className="container mx-auto px-4 pt-24">
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-nebula-pink via-nebula-purple to-nebula-blue">
//             Welcome to Your Cosmic Dashboard
//           </h1>
//           <p className="text-xl text-gray-300">
//             Explore the universe of knowledge and opportunities
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="animate-slide-up">
//             <NoticeBoard />
//           </div>
//           <div className="animate-slide-up bg-space-300 bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
//             <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-nebula-blue to-nebula-purple">
//               Quick Links
//             </h2>
//             <ul className="space-y-4">
//               <li>
//                 <a
//                   href="#"
//                   className="text-starlight hover:text-nebula-pink transition duration-200"
//                 >
//                   Course Schedule
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-starlight hover:text-nebula-pink transition duration-200"
//                 >
//                   Assignments
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-starlight hover:text-nebula-pink transition duration-200"
//                 >
//                   Grades
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-starlight hover:text-nebula-pink transition duration-200"
//                 >
//                   Campus Events
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 bg-nebula-purple text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition duration-200"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 10l7-7m0 0l7 7m-7-7v18"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/student/Header";
import Main from "../../components/student/Main";
import NoticeBoard from "../../components/student/NoticeBoard";
import CosmicBackground from "../../components/student/CosmicBackground";

const AcademicProgress = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="bg-space-300 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-md">
      <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-nebula-blue to-nebula-purple">
        Your Academic Journey
      </h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-nebula-blue bg-nebula-blue bg-opacity-20">
              Semester Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-nebula-blue">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-nebula-blue bg-opacity-20">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-nebula-blue"
          ></div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-space-400 to-space-300 text-starlight font-space">
      <CosmicBackground />
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="text-center mb-12 animate-fade-in mt-4">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-nebula-pink via-nebula-purple to-nebula-blue">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-300">

          </p>
        </div>
        <Main />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="animate-slide-up">
            <NoticeBoard />
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-nebula-purple text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-nebula-pink rounded-full pointer-events-none mix-blend-difference"
        style={{ transition: "0.1s" }}
      ></div>
    </div>
  );
};

export default Dashboard;
