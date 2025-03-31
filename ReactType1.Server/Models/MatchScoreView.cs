using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class MatchScoreView
{
    public string? Player1 { get; set; }

    public string? Player2 { get; set; }

    public int Team1Score { get; set; }

    public int Team2Score { get; set; }

    public int ForFeitId { get; set; }

    public int? Rink { get; set; }

    public int Teamno1 { get; set; }

    public int Teamno2 { get; set; }
}
