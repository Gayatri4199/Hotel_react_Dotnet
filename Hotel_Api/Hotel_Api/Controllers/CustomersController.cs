using Hotel_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        HotelDbContext db;

        public CustomersController(HotelDbContext db)
        {
            this.db = db;
        }
        [HttpPost]
        public string AddCustomer(Customer c)
        {
            db.Customers.Add(c);
            db.SaveChanges();
            return "Customer Added Successfully";
        }
        [HttpGet]
        public List<Customer> GetCustomers()
        {
            return db.Customers.ToList();
        }
        [HttpDelete("{id:int}")]
        public string DeleteCustomer(int id)
        {
            var data = db.Customers.Find(id);
            if (data != null)
            {
                db.Customers.Remove(data);
                db.SaveChanges();
                return "Customer Deleted Successfully";
            }
            return "Customer ID not found";
        }

        [HttpPut("{id:int}")]
        public string UpdateCustomer(int id, Customer c)
        {
            var data = db.Customers.Find(id);
            if (data != null)
            {
                data.Name = c.Name;
                data.Email = c.Email;
                data.Phone = c.Phone;

                db.SaveChanges();
                return "Customer Updated Successfully";
            }
            return "Customer ID not found";
        }
    }
}
