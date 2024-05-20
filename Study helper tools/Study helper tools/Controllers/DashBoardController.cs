using Microsoft.AspNetCore.Mvc;

namespace Study_helper_tools.Controllers
{
	public class DashBoardController : Controller
	{
		public IActionResult DashBoardIndex()
		{
			return View();
		}
	}
}
