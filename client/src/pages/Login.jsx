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

    console.log(`Username: ${username}, Is Student Email: ${isStudentEmail}`); // Debugging line

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
    <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
              Welcome!
            </h4>
            <p className="mb-6 text-gray-500">
              Please sign-in to access your account
            </p>
            <form className="mb-4" onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                  id="username"
                  placeholder="Enter your username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-black focus:bg-white focus:text-gray-600 focus:shadow"
                  placeholder="············"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <div className="mb-4">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border border-black bg-black py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
