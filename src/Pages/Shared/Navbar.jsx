import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  const headerOptions = (
    <>
      <li className="text-xl">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Home
        </NavLink>
      </li>
      <li className="text-xl">
        <NavLink
          to="/colleges"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Colleges
        </NavLink>
      </li>
      {user && (
        <>
          <li className="text-xl">
            <NavLink
              to="/admission"
              className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
              Admission
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink
              to="/mycollege"
              className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
              My College
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar w-9/12 mx-auto mt-3 relative">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            {headerOptions}
          </ul>
        </div>
        <Link to="/" className="navbar-brand hidden md:block">
          <img className="w-36 rounded-md" src="/logo.png" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1">{headerOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Link to="/profile" className="text-xl text-primary">
              {user.displayName || "Profile"}
            </Link>
            <button className="btn btn-error ms-3" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
