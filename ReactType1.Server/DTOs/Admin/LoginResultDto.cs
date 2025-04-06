using System.Drawing.Printing;

namespace ReactType1.Server.DTOs.Admin
{
    public class LoginResultDto
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public required string Role { get; set; }
    }
}
