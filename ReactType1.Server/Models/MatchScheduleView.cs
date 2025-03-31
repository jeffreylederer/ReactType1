using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class MatchScheduleView
{
    public DateOnly GameDate { get; set; }

    public int Rink { get; set; }

    public int Team1 { get; set; }

    public int? Team2 { get; set; }

    public short Divisionid { get; set; }
}
