using System;
using System.Collections.Generic;

namespace ReactType1.Server.Models;

public partial class RecoverPassword
{
    public Guid Id { get; set; }

    public DateTime Time { get; set; }

    public int Userid { get; set; }
}
