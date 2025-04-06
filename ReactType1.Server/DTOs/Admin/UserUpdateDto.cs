namespace ReactType1.Server.DTOs.Admin
{
    public class UserUpdateDto
    {
        public required string password { get; set; }
        public required string confirmPassword { get; set; }
        public int Id { get; set; }
    }
}
