using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class UserLeagueView
{
    public int Id { get; set; }

    public string? LeagueName { get; set; }

    public string Username { get; set; } = null!;

    public string? LeagueRole { get; set; }

    public string? SiteRole { get; set; }

    public bool? Active { get; set; }
}
