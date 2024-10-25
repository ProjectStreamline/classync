import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';

export default function Header() {
  const { email } = useContext(AuthContext);

  return (
    <div className="bg-blue-600 text-gray-200 p-4 text-lg">
      <h1>{email ? `${email}` : ''}</h1>
    </div>
  );
}
