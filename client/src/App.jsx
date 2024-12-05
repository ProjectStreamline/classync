import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseDetails from './components/fa/CourseDetails';
import Registration from './pages/fa/Registration';
import Dashboard from './pages/student/dashboard';
import StudentData from './pages/fa/StudentData';
import StuRegistration from './pages/student/StuRegistration';
import FacultyDashboard from './pages/faculty/facultyDashboard';
import FacultyCourse from './pages/faculty/FacultyCourse';
import RegisteredStudents from './pages/faculty/RegisteredStudents';
import CreateEvaluation from './pages/faculty/CreateEvaluation';
const Loader = lazy(() => import('./components/Loader'));
const Login = lazy(() => import('./pages/Login'));
const FaDashboard = lazy(() => import('./pages/fa/FaDashboard'));
import GenerateNotice from './pages/fa/GenerateNotice';
import Bot from './pages/student/bot';
import Attendance from './pages/faculty/Attendance';
import Backlogs from './components/fa/backlogs';
import Grades from './components/fa/grades';
import AttendenceX from './components/student/Attendence';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* fa routes */}
          <Route path="/fa/dashboard" element={<FaDashboard />} />
          <Route path="/fa/registration" element={<Registration />} />
          <Route path="/fa/generatenotice" element={<GenerateNotice />} />
          <Route path="/fa/student-data" element={<StudentData />} />
           <Route path="/fa/student-data-backlog" element={<Backlogs />} />
          <Route path="/fa/course/:id" element={<CourseDetails />} />
           <Route path="/fa/cgpa" element={<Grades />} />

          {/* faculty routes */}
          {/* student routes */}

          <Route path="/faculty/dashboard/" element={<FacultyDashboard />} />
          <Route
            path="/faculty/dashboard/:course"
            element={<FacultyCourse />}
          />
          <Route
            path="/faculty/dashboard/:course/registered-students"
            element={<RegisteredStudents />}
          />
          <Route
            path="/faculty/dashboard/:course/create-evaluation"
            element={<CreateEvaluation />}
          />
          <Route
            path="/faculty/dashboard/:course/attendance"
            element={<Attendance />}
          />

          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/registration" element={<StuRegistration />} />
          <Route path="/student/bot" element={<Bot />} />
            <Route path="/student/attendence" element={<AttendenceX />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
