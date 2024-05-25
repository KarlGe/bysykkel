using System.Net;

namespace Bysykkel.Tests.Mocks;

public class MockHttpMessageHandler : HttpMessageHandler
{
    private readonly Dictionary<string, HttpContent> _endpoints;

    public MockHttpMessageHandler(Dictionary<string, HttpContent> endpoints)
    {
        _endpoints = endpoints;
    }
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (_endpoints.TryGetValue(request.RequestUri.ToString(), out var content))
            return Task.FromResult(new HttpResponseMessage() { Content = content });

        return Task.FromResult(new HttpResponseMessage() { StatusCode = HttpStatusCode.NotFound });
    }
}