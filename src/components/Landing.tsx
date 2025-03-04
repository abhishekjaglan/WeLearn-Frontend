import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to WeLearn</h1>
      <p className="text-lg text-gray-600 mb-8">Summarize your media effortlessly.</p>
      <div className="flex space-x-4">
        <Link to="/signin" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
          Sign In
        </Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;