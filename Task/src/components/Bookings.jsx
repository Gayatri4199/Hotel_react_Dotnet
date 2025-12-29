import axios from "axios";
import { useEffect, useState } from "react";

export default function Bookings() {
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Active"
  });

  useEffect(() => {
    axios.get("http://localhost:7089/api/customers").then(res => setCustomers(res.data));
    axios.get("http://localhost:7089/api/rooms").then(res => setRooms(res.data));
    axios.get("http://localhost:7089/api/bookings").then(res => setBookings(res.data));
  }, []);

  const addBooking = () => {
    axios.post("http://localhost:7089/api/bookings", form)
      .then(() => window.location.reload())
      .catch(() => alert("Room is already booked"));
  };

  return (
    <div>
      <h2>Bookings</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select"
            value={form.customerId}
            onChange={(e) => setForm({ ...form, customerId: e.target.value })}>
            <option>Select Customer</option>
            {customers.map(c => <option key={c.customerId} value={c.customerId}>{c.name}</option>)}
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-select"
            value={form.roomId}
            onChange={(e) => setForm({ ...form, roomId: e.target.value })}>
            <option>Select Room</option>
            {rooms.map(r => <option key={r.roomId} value={r.roomId}>{r.roomNumber}</option>)}
          </select>
        </div>

        <div className="col-md-3">
          <input type="date" className="form-control"
            onChange={(e) => setForm({ ...form, checkInDate: e.target.value })} />
        </div>

        <div className="col-md-3">
          <input type="date" className="form-control"
            onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })} />
        </div>

        <div className="col-md-12 mt-2">
          <button className="btn btn-primary" onClick={addBooking}>Book Room</button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Customer</th><th>Room</th>
            <th>CheckIn</th><th>CheckOut</th><th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b.bookingId}>
              <td>{b.bookingId}</td>
              <td>{b.customerId}</td>
              <td>{b.roomId}</td>
              <td>{b.checkInDate}</td>
              <td>{b.checkOutDate}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
