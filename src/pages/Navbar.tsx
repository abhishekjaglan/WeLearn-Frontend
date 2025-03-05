import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const userId = Cookies.get('userId');
  const initials = userId ? 'AJ' : 'AJ'; // Placeholder for real initials

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-20">
      <Link to="/home" className="text-2xl font-bold">
        WeLearn
      </Link>
      {userId && (
        <div className="flex items-center">
          <span className="mr-2 hidden md:block">{initials}</span>
          <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center">
            {initials}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;