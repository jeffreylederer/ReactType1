using Microsoft.AspNetCore.Mvc;
using ReactType1.Server.Models;


namespace ReactType1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration) => _configuration = configuration;

        // GET: Matches
        [HttpGet]
        public SiteInfo GetInfo()
        {
            SiteInfo item = new ()
            {
                Clubname = _configuration.GetValue<string>("SiteInfo:clubname")??"Unknown club",
                Contact = _configuration.GetValue<string>("SiteInfo:contact") ?? "jeffrey@winnlederer.com"
            };

            return item;
        }
    }

    public class SiteInfo
    {
        public required string Clubname { get; set; }
        public required string Contact { get; set; }

    }
}


