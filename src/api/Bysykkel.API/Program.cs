using AutoMapper;
using Bysykkel.API;
using Bysykkel.Application.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

builder.Services.AddHttpClient();



var CorsPolicyName = "ClientOrigins";

var ClientOrigin = builder.Configuration.GetSection("Client:AllowedOrigin").Get<string>();
if(ClientOrigin == null) {
    throw new Exception("Allowed origin not defined");
}
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicyName, policy => policy.WithOrigins(ClientOrigin));
});

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddScoped<IBysykkelService, BysykkelService>();

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
