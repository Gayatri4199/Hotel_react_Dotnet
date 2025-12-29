using Hotel_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        HotelDbContext db;
        public RoomsController(HotelDbContext db)
        {
            this.db = db;
        }
        [HttpPost]
        public string AddRoom(Room r)
        {
            db.Rooms.Add(r);
            db.SaveChanges();
            return "Room Added Successfully";
        }
        [HttpGet]
        public List<Room> GetRooms()
        {
            return db.Rooms.ToList();
        }
        [HttpDelete("{id:int}")]
        public string DeleteRoom(int id)
        {
            var data = db.Rooms.Find(id);
            if (data != null)
            {
                db.Rooms.Remove(data);
                db.SaveChanges();
                return "Room Deleted Successfully";
            }
            return "Room ID not found";
        }
        [HttpPut("{id:int}")]
        public string UpdateRoom(int id, Room r)
        {
            var data = db.Rooms.Find(id);
            if (data != null)
            {
                data.RoomNumber = r.RoomNumber;
                data.Type = r.Type;
                data.Price = r.Price;
                data.Status = r.Status;

                db.SaveChanges();
                return "Room Updated Successfully";
            }
            return "Room ID not found";
        }
    }
}
