import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Barber Bookings
      </Link>

      <ul>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
        <CustomLink to="/log-in">Login</CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolevedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolevedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
