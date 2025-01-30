using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTimeOffset? LastLoggedIn { get; set; }

    public string SerialNumber { get; set; } = null!;

    public virtual ICollection<UserLeague> UserLeagues { get; set; } = new List<UserLeague>();

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
