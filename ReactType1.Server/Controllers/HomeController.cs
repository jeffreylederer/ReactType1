using Microsoft.AspNetCore.Mvc;
using ReactType1.Server.Models;


namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET: Matches
        [HttpGet]
        public SiteInfo GetInfo()
        {
            SiteInfo item = new SiteInfo()
            {
                clubname = _configuration.GetValue<string>("SiteInfo:clubname"),
                contact = _configuration.GetValue<string>("SiteInfo:contact")
            };

            return item;
        }
    }

    public class SiteInfo
    {
        public string clubname { get; set; }
        public string contact { get; set; }

    }
}


