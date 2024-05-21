using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class LogOutController : Controller
    {
        public IActionResult LogOutIndex()
        {
            SharedValues.setAllNull();
            return RedirectToAction("Index", "SignUpLogin");
        }
    }
}
