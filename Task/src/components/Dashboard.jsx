import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7089/api/rooms")
      .then(res => setRooms(res.data));
  }, []);

  const total = rooms.length;
  const booked = rooms.filter(r => r.status === "Booked").length;
  const available = rooms.filter(r => r.status === "Available").length;

  return (
    <div className="row">

      <div className="col-md-4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-building"></i> Total Rooms</h5>
            <h2>{total}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-white bg-danger mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-lock-fill"></i> Booked Rooms</h5>
            <h2>{booked}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title"><i className="bi bi-unlock-fill"></i> Available</h5>
            <h2>{available}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}
