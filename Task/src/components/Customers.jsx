import axios from "axios";
import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editData, setEditData] = useState(null);

  const fetchCustomers = () => {
    axios.get("http://localhost:7089/api/customers")
      .then(res => setCustomers(res.data));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const addCustomer = () => {
    axios.post("http://localhost:7089/api/customers", form).then(() => {
      fetchCustomers();
      setForm({ name: "", email: "", phone: "" });
    });
  };

  const updateCustomer = () => {
    axios.put(`http://localhost:7089/api/customers/${editData.customerId}`, editData).then(() => {
      fetchCustomers();
      setEditData(null);
    });
  };

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:7089/api/customers/${id}`).then(fetchCustomers);
  };

  return (
    <div>
      <h2>Customers</h2>

      {/* Add Customer */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Phone"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={addCustomer}>Add</button>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th width="150px">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.customerId}>
              <td>{c.customerId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>

              <td>
                <button className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditData(c)}>
                  Edit
                </button>

                <button className="btn btn-danger btn-sm"
                  onClick={() => deleteCustomer(c.customerId)}>
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
                <h5>Edit Customer</h5>
                <button className="btn-close" onClick={() => setEditData(null)}></button>
              </div>

              <div className="modal-body">
                <input className="form-control mb-2"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <input className="form-control mb-2"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <input className="form-control mb-2"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditData(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={updateCustomer}>Save</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
