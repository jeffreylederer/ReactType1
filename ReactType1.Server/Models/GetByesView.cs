using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class GetByesView
{
    public int Id { get; set; }

    public string? Players { get; set; }

    public short Division { get; set; }

    public int TeamNo { get; set; }

    public DateOnly GameDate { get; set; }
}
