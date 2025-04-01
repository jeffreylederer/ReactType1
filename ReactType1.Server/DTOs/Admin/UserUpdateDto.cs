namespace ReactType1.Server.DTOs.Admin
{
    public class UserUpdateDto
    {
        public string? password { get; set; }
        public string? confirmPassword { get; set; }
        public int Id { get; set; }
    }
}
