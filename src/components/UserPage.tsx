import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';

const UserPage: React.FC = () => {
  const userId = Cookies.get('userId') || 'Unknown';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="p-6 ml-0 md:ml-64 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
        <div className="bg-white p-6 rounded shadow-md max-w-md">
          <p className="text-gray-700 mb-2">User ID: {userId}</p>
          <p className="text-gray-700">Email: user@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;