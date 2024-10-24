import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseDetails from './components/fa/CourseDetails';
import Registration from './pages/fa/Registration';
import Dashboard from './pages/student/dashboard';

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
          <Route path="/student/dashboard" element={<Dashboard />} />

          {/* faculty routes */}
          {/* <Route path="/faculty/dashboard" element={<FacultyDashboard />} /> */}
          {/* <Route
            path="/faculty/course-dashboard"
            element={<CourseDashboard />}
          /> */}
          {/* <Route path="/faculty/cutoff" element={<Cutoff />} /> */}
          {/* <Route
            path="/faculty/marks-evaluation"
            element={<MarkEvaluation />}
          /> */}
          {/* <Route
            path="/faculty/evaluation-scheme"
            element={<EvaluationScheme />}
          /> */}
          {/* <Route path="/results" element={<Results />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
