using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Database;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class PromodoroController : Controller
    {
        private readonly appDbContext _db;
        public PromodoroController(appDbContext db)
        {
            _db = db;
        }
        public IActionResult PromodoroIndex()
        {
            SharedValues.setActive("Promdoro"); 
            SharedValues.CurTask = null;
            return View();
        }

        [HttpPost]
        public IActionResult SelectTask(int taskId)
        {
            // not send it in Model because i need it in another action
            SharedValues.CurTask = SharedValues.CurUserTasks.Find(x => x.Id == taskId);
            return View("PromodoroIndex");
        }

        [HttpPost]
        public IActionResult MarkDoneTask(int taskId , int timePerTask)
        {
            ToDo task = _db.ToDos.FirstOrDefault(t=>t.Id == taskId);
            task.IsDone = true;
            task.TimePerTask += timePerTask;
            _db.SaveChanges();
            SharedValues.CurUserTasks = _db.ToDos.Where(t=>t.UserId == SharedValues.CurUser.Id && t.IsDeleted==false).ToList();
            SharedValues.setTasks();
            SharedValues.CurTask = null;
            return View("PromodoroIndex");
        }

        [HttpPost]
        public IActionResult EditTimePerTask(int taskID, int timePerTask)
        {
            _db.ToDos.FirstOrDefault(t=>t.Id == taskID).TimePerTask += timePerTask;
            _db.SaveChanges();
            SharedValues.CurTask = null;
            return View("PromodoroIndex");
        }
    }

    
}
