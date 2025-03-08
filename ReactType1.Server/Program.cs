using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Infrastructure;
using ReactType1.Server.Models;
using ReactType1.Server.Contracts;
using ReactType1.Server.Repository;


QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped
    <IMembershipRepository, MembershipRepository>();

var connectionString = builder.Configuration.GetConnectionString("DbLeagueApp") ?? throw new InvalidOperationException("Connection string 'DbLeagueApp' not found.");
builder.Services.AddDbContextFactory<DbLeagueApp>(opt =>
    opt.UseSqlServer(connectionString));


var app = builder.Build();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );  

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");



app.Run();
