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
import Bot from './pages/student/bot';
const Loader = lazy(() => import('./components/Loader'));
const Login = lazy(() => import('./pages/Login'));
const FaDashboard = lazy(() => import('./pages/fa/FaDashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* fa routes */}
          <Route path="/fa/dashboard" element={<FaDashboard />} />
          <Route path="/fa/registration" element={<Registration />} />
          <Route path="/fa/student-data" element={<StudentData />} />
          <Route path="/fa/course/:id" element={<CourseDetails />} />

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

          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/registration" element={<StuRegistration />} />
           <Route path="/student/bot" element={<Bot/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
