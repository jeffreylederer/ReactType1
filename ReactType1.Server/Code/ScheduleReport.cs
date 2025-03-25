using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ReactType1.Server.Models;
using System.Numerics;

namespace ReactType1.Server.Code
{
    public class ScheduleReport
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">leagueid</param>
        /// <param name="db">context</param>
        public IDocument CreateDocument(int id, DbLeagueApp db)
        {
            League? league = db.Leagues.Find(id);
            var schedule = league.Schedules.OrderBy(x => x.GameDate).ToList();

            List<MatchScheduleView> matches = new List<MatchScheduleView>();
            foreach (var item in schedule)
            {
                foreach (var match in db.Matches.Where(x => x.WeekId == item.Id))
                {
                    matches.Add(new MatchScheduleView()
                    {
                        GameDate = item.GameDate,
                        Rink = match.Rink,
                        Team1 = match.TeamNo1,
                        Team2 = match.TeamNo2,
                        Divisionid = match.TeamNo1Navigation.DivisionId
                    });
                }
            }
                



            List<AllTeamsView> teams = new List<AllTeamsView>();
            foreach (var team in league.Teams)
            {
                teams.Add(new AllTeamsView()
                {
                    Id = team.Id,
                    Skip = team.Skip != null? team.SkipNavigation.Membership.FullName : null,
                    ViceSkip = team.ViceSkip != null ? team.ViceSkipNavigation.Membership.FullName : null,
                    Lead = team.Lead != null ? team.LeadNavigation.Membership.FullName : null,
                    Skipid = team.Skip,
                    ViceSkipid = team.ViceSkip,
                    Leadid = team.Lead,
                    Leagueid = team.Leagueid,
                    Division = team.DivisionId,
                    TeamNo = team.TeamNo
                });
            }

            int rinks =league.Teams.Count() / 2;
            int? TeamSize = league?.TeamSize;

            return Document.Create(container =>
            {
                container
                .Page(page =>
                {
                    page.Margin(50);

                    page.Header()
                        .AlignCenter()
                        .AlignMiddle()
                        .Text(league?.LeagueName);

                    page.Content().PaddingVertical(20).Column(column =>
                    {


                        column.Item().AlignCenter().Table(table =>
                        {
                            table.Header(header =>
                            {

                                header.Cell().
                                    ColumnSpan((uint)TeamSize.Value + 1)
                                    .AlignCenter()
                                    .AlignMiddle()
                                    .Text("Teams");
                            });

                            table.ColumnsDefinition(columns =>
                            {

                                columns.ConstantColumn(40); //team number
                                columns.ConstantColumn(90); //Skip
                                if (TeamSize.HasValue && TeamSize.Value == 3)
                                    columns.ConstantColumn(90); //ViceSkip
                                if (TeamSize.HasValue && TeamSize.Value > 1)
                                    columns.ConstantColumn(90); //Lead

                            });

                            static IContainer CellStyle2(IContainer container)
                            {
                                return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                            }

                            table.Cell().Element(CellStyle2).Text("Team #").SemiBold().FontSize(10);
                            table.Cell().Element(CellStyle2).Text("Skip").SemiBold().FontSize(10);
                            if (TeamSize == 3)
                                table.Cell().Element(CellStyle2).Text("Vice Skip").SemiBold().FontSize(10);
                            if (TeamSize > 1)
                                table.Cell().Element(CellStyle2).Text("Lead").SemiBold().FontSize(10);

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                            }

                            foreach (var item in teams)
                            {
                                table.Cell().Element(CellStyle).Text(item.TeamNo.ToString()).FontSize(10);
                                table.Cell().Element(CellStyle).Text(item.Skip).FontSize(10);
                                if (TeamSize == 3)
                                    table.Cell().Element(CellStyle).Text(item.ViceSkip).FontSize(10);
                                if (TeamSize > 1)
                                    table.Cell().Element(CellStyle).Text(item.Lead).FontSize(10);
                            }

                        }); //table 1

                        column.Item().Inlined(inlined =>
                        {
                            inlined.Spacing(20);
                            inlined.Item().Text("");
                        });

                        column.Item().AlignCenter().Table(table =>
                        {
                            table.Header(header =>
                            {

                                header.Cell().
                                    ColumnSpan((uint) rinks+1)
                                    .AlignCenter()
                                    .AlignMiddle()
                                    .Text("Schedule");

                            });

                            table.ColumnsDefinition(columns =>
                            {

                                columns.ConstantColumn(60); //date
                                for (int i = 0; i < rinks; i++)
                                {
                                    columns.ConstantColumn(30); //games
                                }
                            });

                            static IContainer CellStyle2(IContainer container)
                            {
                                return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                            }

                            
                            table.Cell().Element(CellStyle2).Text("Date").SemiBold().FontSize(10);

                            for (int i = 0; i < rinks; i++)
                            {
                                table.Cell().Element(CellStyle2).Text((i + 1).ToString()).SemiBold().FontSize(10);
                            }

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.Border(1).BorderColor(Colors.Black).PaddingVertical(5).AlignCenter();
                            }

                            int index = 0;
                            
                            for (int w = 0; w < schedule.Count; w++)
                            {
                                table.Cell().Element(CellStyle).Text(schedule[w].GameDate.ToShortDateString()).FontSize(10);
                                for (int r = 0; r < rinks; r++)
                                {
                                    var match = $"{matches[index].Team1}-{matches[index].Team2}";
                                    table.Cell().Element(CellStyle).Text(match).FontSize(10);
                                    index++;

                                }
                            }

                        }); //table 2
                    }); //content
                }); //container
            }); //return
        } //method
    } //class
} //namespace
