namespace ReactType1.Server.DTOs.Membership
{
    public class UpdateMembershipDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Shortname { get; set; }

        public bool Wheelchair { get; set; }
    }
}
