using Microsoft.EntityFrameworkCore;
using ResumeManagement.Server.Core.AutoMapperConfig;
using ResumeManagement.Server.Core.Context;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// DB Configuration

builder.Services.AddDbContext<ManagementContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("local"));
});

// Automapper Configuration
builder.Services.AddAutoMapper(typeof(AutoMapperConfigProfile));

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{
    opt
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
