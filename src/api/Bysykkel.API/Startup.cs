using AutoMapper;
using Bysykkel.API;
using Bysykkel.Application.Services;

public class Startup
{
    IConfiguration _configuration;
    const string CorsPolicyName = "ClientOrigins";
    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddHealthChecks();
        services.AddMemoryCache();
        services.AddHttpClient();


        var ClientOrigin = _configuration.GetSection("Client:AllowedOrigin").Get<string>();
        if (ClientOrigin == null)
        {
            throw new Exception("Allowed origin not defined");
        }
        services.AddCors(options =>
        {
            options.AddPolicy(name: CorsPolicyName, policy => policy.WithOrigins(ClientOrigin));
        });

        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        services.AddScoped<IBysykkelService, BysykkelService>();
    }
    public void AddHttpClients(IServiceCollection services)
    {
        services.AddHttpClient<IBysykkelService, BysykkelService>(client =>
        {
            var baseUrl = _configuration.GetValue<string>("Bysykkel:BaseUrl");
            if (baseUrl == null)
            {
                throw new Exception("Missing Bysykkel configuration");
            }
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Add("Client-Identifier", _configuration.GetValue<string>("Bysykkel:ClientIdentifier"));
        });
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        app.UseHealthChecks("/health");

        // Configure the HTTP request pipeline.
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors(CorsPolicyName);

        app.UseHttpsRedirection();

        app.UseAuthorization();
    }
}