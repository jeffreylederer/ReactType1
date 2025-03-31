using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class RinkOrder
{
    public int Id { get; set; }

    public string Green { get; set; } = null!;

    public string Direction { get; set; } = null!;

    public string Boundary { get; set; } = null!;
}
