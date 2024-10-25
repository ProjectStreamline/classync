import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseDetails from './components/fa/CourseDetails';
import Registration from './pages/fa/Registration';
import Dashboard from './pages/student/dashboard';
import StudentData from './pages/fa/StudentData';
import StuRegistration from './pages/student/StuRegistration';
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
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/registration" element={<StuRegistration />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
