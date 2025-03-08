namespace ReactType1.Server.DTOs.Membership
{
    public class CreateMembershipDto
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

 
        public string? Shortname { get; set; }


        public bool Wheelchair { get; set; }
    }
}
