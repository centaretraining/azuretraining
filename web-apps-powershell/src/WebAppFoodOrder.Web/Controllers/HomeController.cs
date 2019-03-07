using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebAppFoodOrder.Web.Models;

namespace WebAppFoodOrder.Web.Controllers
{
  public class HomeController : Controller
  {
    private readonly IConfiguration _configuration;

    public HomeController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public IActionResult Index()
    {
      var model = new IndexViewModel()
      {
        ApiDomain = _configuration.GetValue<string>("ApiDomain")
      };
      return View(model);
    }
  }
}
