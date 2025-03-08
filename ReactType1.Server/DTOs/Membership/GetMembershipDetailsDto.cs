namespace ReactType1.Server.DTOs.Membership
{
    public class GetMembershipDetailsDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string? Shortname { get; set; }

        public string? NickName { get; set; }

        public bool Wheelchair { get; set; }
    }
}
