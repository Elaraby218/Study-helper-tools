using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class ToDoController : Controller
    {
        public IActionResult ToDOIndex()
        {
            SharedValues.setActive("ToDo");
            return View();
        }
    }
}
