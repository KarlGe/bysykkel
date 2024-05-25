namespace Bysykkel.Tests;

using Bysykkel.Application.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Bysykkel.Tests.Mocks;

public class BysykkelServiceTests
{
    IBysykkelService _bysykkelService;
    public BysykkelServiceTests()
    {
        var services = new ServiceCollection();
        services.AddMemoryCache();
        var serviceProvider = services.BuildServiceProvider();

        var memoryCache = serviceProvider.GetService<IMemoryCache>();
        var httpClient = MockBysykkelHttpClient.GetMockedClient();
        _bysykkelService = new BysykkelService(httpClient, memoryCache);
    }

    [Fact]
    public async Task Stations_Success_ReturnsExpectedData()
    {
        var test = MockData.BuildMockStation();
        var result = await _bysykkelService.GetStationsAsync();
        Assert.Equivalent(test, result.First());
    }

    [Fact]
    public async Task StationInfo_Success_ReturnsExpectedData() { 
        var test = MockData.BuildMockStation().Status;
        var result = await _bysykkelService.GetStationStatusAsync();
        Assert.Equivalent(test, result.Data.Stations[0]);
    }

    [Fact]
    public async Task StationStatus_Success_ReturnsExpectedData() { 
        var test = MockData.BuildMockStation().Info;
        var result = await _bysykkelService.GetStationInfoAsync();
        Assert.Equivalent(test, result.Data.Stations[0]);
    }
}