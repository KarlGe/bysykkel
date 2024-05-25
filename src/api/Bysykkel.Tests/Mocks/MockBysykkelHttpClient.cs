using System.Text.Json;
using Moq;

namespace Bysykkel.Tests.Mocks;

static class MockBysykkelHttpClient
{
    public static HttpClient GetMockedClient()
    {
        var BaseUrl = "http://example.com/api/";
        var endpoints = new Dictionary<string, HttpContent>() {
            { BaseUrl + "station_information.json", new StringContent(JsonSerializer.Serialize(MockData.BuildStationInformationData())) },
            { BaseUrl + "station_status.json", new StringContent(JsonSerializer.Serialize(MockData.BuildStationStatusData())) },
        };
        var messageHandler = new MockHttpMessageHandler(endpoints);
        var httpClient = new Mock<HttpClient>(messageHandler) { CallBase = true };
        httpClient.Object.BaseAddress = new Uri(BaseUrl);
        return httpClient.Object;
    }
}