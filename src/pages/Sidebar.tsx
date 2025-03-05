import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mediaTypes = ['Documents', 'URLs', 'Audio', 'Video'];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-blue-500 text-white fixed top-16 left-0 z-10 md:hidden"
      >
        ☰
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto`}
      >
        <div className="p-4 mt-16 md:mt-0">
          <h3 className="text-xl font-semibold">Menu</h3>
          <ul className="mt-4">
            {mediaTypes.map((type) => (
              <li key={type} className="py-2">
                <Link to={`/home/${type.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {type}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <Link to="/user" onClick={() => setIsOpen(false)}>
                User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;