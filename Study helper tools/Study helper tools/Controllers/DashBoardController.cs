using Microsoft.AspNetCore.Mvc;
using Study_helper_tools.Models;

namespace Study_helper_tools.Controllers
{
	public class DashBoardController : Controller
	{
		public IActionResult DashBoardIndex()
		{
			SharedValues.setActive("DashBoard");
			return View();
		}
	}
}
