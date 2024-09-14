import { Link } from 'react-router-dom';
import CenteredLayout from '../components/CenteredLayout';

const HomePage = () => (
  <CenteredLayout>
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Game</h1>
      <Link
        to="/login"
        className="bg-blue-500 text-white py-2 px-4 rounded mx-2"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-green-500 text-white py-2 px-4 rounded mx-2"
      >
        Register
      </Link>
    </div>
  </CenteredLayout>
);

export default HomePage;
