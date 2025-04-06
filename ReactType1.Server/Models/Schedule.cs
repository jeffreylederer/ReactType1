using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class Schedule
{
    public int Id { get; set; }

    public required DateOnly GameDate { get; set; }

    public int Leagueid { get; set; }

    public bool Cancelled { get; set; }

    public bool PlayOffs { get; set; }

    public virtual League League { get; set; } = null!;

    public virtual ICollection<Match> Matches { get; set; } = new List<Match>();
}
