using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Database;
using Study_helper_tools.Models;
using System.Numerics;

namespace Study_helper_tools.Controllers
{
    public class ToDoController : Controller
    {
        private readonly appDbContext _context;
        public ToDoController(appDbContext context) { _context = context; }

        public IActionResult ToDOIndex()
        {
            SharedValues.setActive("ToDo");
            return View(new ToDo());
        }

        [HttpPost]
        public IActionResult AddTask(ToDo task)
        {
            ToDo newTask = _context.ToDos.FirstOrDefault(t => t.Id == task.Id);
            if(newTask==null)
            {
                task.AddedDate = DateTime.Now;
                task.IsDone = false;
                task.IsDeleted = false;
                task.UserId = SharedValues.CurUser.Id;
                task.TimePerTask = 0;
                task.DoneDate = DateTime.MinValue;
                _context.ToDos.Add(task);
                _context.SaveChanges();
                SharedValues.CurUserTasks.Add(task);
                SharedValues.setTasks();
            }
            else
            {
                newTask.TaskTitle = task.TaskTitle;
                newTask.TaskDescription = task.TaskDescription;
                _context.SaveChanges();
                resetTasks();
            }
            return RedirectToAction("ToDOIndex");
        }
        private void resetTasks()
        {
            SharedValues.CurUserTasks = _context.ToDos.Where(t => t.UserId == SharedValues.CurUser.Id && t.IsDeleted == false).ToList();
            SharedValues.setTasks();
        }
        public IActionResult MarkTaskAsDone(int taskID)
        {
            ToDo task = _context.ToDos.FirstOrDefault(t => t.Id == taskID);
            task.IsDone = true;
            task.DoneDate = DateTime.Now;
            _context.SaveChanges();
            resetTasks();
            return RedirectToAction("ToDOIndex");
        }

        public IActionResult DelteTask(int taskID)
        {
            ToDo task = _context.ToDos.FirstOrDefault(t => t.Id == taskID);
            task.IsDeleted = true;
            _context.SaveChanges();
            resetTasks();
            return RedirectToAction("ToDOIndex");
        }

        public IActionResult EditTask(int taskID)
        {
            ToDo task = _context.ToDos.FirstOrDefault(t => t.Id == taskID);
            return View("ToDOIndex", task);
        }
    }
}
