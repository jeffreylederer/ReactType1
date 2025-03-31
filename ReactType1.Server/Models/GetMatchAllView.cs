using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class GetMatchAllView
{
    public int Id { get; set; }

    public string? Skip1 { get; set; }

    public string? Vice1 { get; set; }

    public string? Lead1 { get; set; }

    public string? Skip2 { get; set; }

    public string? Vice2 { get; set; }

    public string? Lead2 { get; set; }

    public int Team1 { get; set; }

    public int Team2 { get; set; }

    public DateOnly Date { get; set; }

    public int Rink { get; set; }

    public short Division1 { get; set; }

    public short Division2 { get; set; }
}
