using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Database;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class SignUpLoginController : Controller
    {
        private readonly appDbContext _context;
        public SignUpLoginController(appDbContext context)
        {
            _context = context;
        }

        // index page
        public IActionResult Index()
        {
            return View();
        }

        //sign up action
        [HttpPost]
        public IActionResult SignUp(User user)
        {

            User InUser = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            if (InUser == null)
            {
                user.RegisterDate = DateTime.Now;
                _context.Users.Add(user);
                _context.SaveChanges();
                return RedirectToAction("Privacy", "Home");
            }
            else
            {
                return Content("User already exists");
            }
        }

        //login action
        [HttpPost]
        public IActionResult Login(User user)
        {
            User InUser = _context.Users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
            if (InUser != null)
            {
                return RedirectToAction("Privacy", "Home");
            }
            else
            {
                return Content("User not found");
            }
        }

        
    }
}
