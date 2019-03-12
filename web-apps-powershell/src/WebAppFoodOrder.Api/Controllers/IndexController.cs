using Microsoft.AspNetCore.Mvc;

namespace WebAppFoodOrder.Api.Controllers
{
    [Route("")]
    public class IndexController
    {
        [Route("")]
        public IActionResult Get()
        {
            return new OkResult();
        }
    }
}