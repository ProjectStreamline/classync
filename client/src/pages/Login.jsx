import { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';

const Login = () => {
  const { setEmail, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const facultyEmails = ["rashmi@gmail.com", "kamjeet@gmail.com", "nishant@gmail.com"];

  const handleLogin = (e) => {
    e.preventDefault();

    const studentEmailPattern =
      /^bt21ece(0[0-9]{2}|1[01][0-9]|130)@iiitn\.ac\.in$/;
    const isStudentEmail = studentEmailPattern.test(username);

    if (isStudentEmail && password === '1') {
      setEmail(username);
      setIsAuthenticated(true);
      window.location.href = '/student/dashboard'; // Redirect after successful login
    } else if (username === 'fa' && password === 'fa') {
      setEmail(username);
      setIsAuthenticated(true);
      window.location.href = '/fa/dashboard';
    } else if (facultyEmails.includes(username) && password === '1') {
      setEmail(username);
      setIsAuthenticated(true);
      window.location.href = '/faculty/dashboard';
    } else if (username === 'admin' && password === 'admin') {
      setEmail(username);
      setIsAuthenticated(true);
      window.location.href = '/admin/dashboard';
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-300">
      <div className="w-full max-w-md px-6 py-10 bg-gray-800 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h4 className="text-2xl font-bold text-gray-100 mb-2">
            Welcome Back!
          </h4>
          <p className="text-gray-400 text-sm">
            Sign in to access your dashboard
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      
      </div>
    </div>
  );
};

export default Login;
