import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Hotel System</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/rooms">Rooms</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customers">Customers</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/bookings">Bookings</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
