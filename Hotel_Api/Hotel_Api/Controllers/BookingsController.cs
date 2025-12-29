using Hotel_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        HotelDbContext db;

        public BookingsController(HotelDbContext db)
        {
            this.db = db;
        }
        [HttpPost]
        public string AddBooking(Booking b)
        {
            // Save booking
            db.Bookings.Add(b);

            // Change room status
            var room = db.Rooms.Find(b.RoomId);
            if (room != null)
            {
                room.Status = "Booked";
            }

            db.SaveChanges();
            return "Booking Created Successfully";
        }
        [HttpGet]
        public List<Booking> GetBookings()
        {
            return db.Bookings.ToList();
        }
        [HttpPut("{id:int}/cancel")]
        public string CancelBooking(int id)
        {
            var data = db.Bookings.Find(id);
            if (data != null)
            {
                data.Status = "Cancelled";

                // Set room to Available again
                var room = db.Rooms.Find(data.RoomId);
                if (room != null)
                {
                    room.Status = "Available";
                }

                db.SaveChanges();
                return "Booking Cancelled Successfully";
            }

            return "Booking ID not found";
        }

        // DELETE BOOKING
        [HttpDelete("{id:int}")]
        public string DeleteBooking(int id)
        {
            var data = db.Bookings.Find(id);
            if (data != null)
            {
                db.Bookings.Remove(data);
                db.SaveChanges();
                return "Booking Deleted Successfully";
            }
            return "Booking ID not found";
        }

    }
}
