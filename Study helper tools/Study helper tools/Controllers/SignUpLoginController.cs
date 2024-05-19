using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Database;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
    public class SignUpLoginController : Controller
    {
        private readonly appDbContext _context;
        private readonly IWebHostEnvironment _webHost;
        public SignUpLoginController(appDbContext context, IWebHostEnvironment webHost)
        {
            _context = context;
            _webHost = webHost;
        }

        // index page
        public IActionResult Index()
        {
            return View();
        }

        //sign up action
        [HttpPost]
        public async Task<IActionResult> SignUp(User user, IFormFile file)
        {
            User InUser = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            if (InUser == null)
            {
                user.RegisterDate = DateTime.Now.Date; // Ensure only the date part is stored

                if (file != null && file.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_webHost.WebRootPath, "uploads");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    user.PhotoPath = "\\uploads\\" + uniqueFileName; // Save the unique file name to the user
                }
                else
                {
                    user.PhotoPath = "\\uploads\\noimg.png";
                }

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


        public string GetPhotoPath(string filePath, int userid)
        {
            List<string> Path = filePath.Split("\\").ToList();
            string PhotoPath = "/" + Path[Path.Count - 2] + "/" + Path[Path.Count - 1] + userid.ToString();
            return PhotoPath;
        }

    }
}
