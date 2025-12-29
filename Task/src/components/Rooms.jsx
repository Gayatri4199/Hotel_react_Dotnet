import axios from "axios";
import { useEffect, useState } from "react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ roomNumber: "", type: "", price: "", status: "Available" });
  const [editData, setEditData] = useState(null);

  const fetchRooms = () => {
    axios.get("http://localhost:7089/api/rooms")
      .then(res => setRooms(res.data));
  };

  useEffect(() => { fetchRooms(); }, []);

  const addRoom = () => {
    axios.post("http://localhost:7089/api/rooms", form).then(() => {
      fetchRooms();
      setForm({ roomNumber: "", type: "", price: "", status: "Available" });
    });
  };

  const updateRoom = () => {
    axios.put(`http://localhost:7089/api/rooms/${editData.roomId}`, editData).then(() => {
      fetchRooms();
      setEditData(null);
    });
  };

  const deleteRoom = (id) => {
    axios.delete(`http://localhost:7089/api/rooms/${id}`).then(fetchRooms);
  };

  return (
    <div>
      <h2>Rooms</h2>

      {/* Add Room */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Room Number"
            value={form.roomNumber} onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} />
        </div>

        <div className="col-md-3">
          <input className="form-control" placeholder="Type"
            value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </div>

        <div className="col-md-3">
          <input className="form-control" placeholder="Price"
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={addRoom}>Add Room</button>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th width="150px">Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((r) => (
            <tr key={r.roomId}>
              <td>{r.roomId}</td>
              <td>{r.roomNumber}</td>
              <td>{r.type}</td>
              <td>{r.price}</td>
              <td>{r.status}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditData(r)}>
                  Edit
                </button>

                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteRoom(r.roomId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editData && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Edit Room</h5>
                <button className="btn-close" onClick={() => setEditData(null)}></button>
              </div>

              <div className="modal-body">
                <input className="form-control mb-2" value={editData.roomNumber}
                  onChange={(e) => setEditData({ ...editData, roomNumber: e.target.value })} />

                <input className="form-control mb-2" value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value })} />

                <input className="form-control mb-2" value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditData(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={updateRoom}>Save</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
