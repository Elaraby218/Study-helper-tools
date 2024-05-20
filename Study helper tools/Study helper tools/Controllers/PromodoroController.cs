using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class PromodoroController : Controller
    {
        public IActionResult PromodoroIndex()
        {
            SharedValues.setActive("Promdoro"); 
            return View();
        }
    }
}
