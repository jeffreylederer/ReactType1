namespace ReactType1.Server.DTOs.Admin
{
    public class ChangeUserPasswordDTO
    {
        public Guid Id { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}
