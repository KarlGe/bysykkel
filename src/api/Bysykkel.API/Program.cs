var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

var CorsPolicyName = "ClientOrigins";

var ClientOrigin = builder.Configuration.GetSection("Client:AllowedOrigin").Get<string>();
if(ClientOrigin == null) {
    throw new Exception("Allowed origin not defined");
}
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicyName, policy => policy.WithOrigins(ClientOrigin));
});

var app = builder.Build();

app.MapHealthChecks("/health");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(CorsPolicyName);
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
