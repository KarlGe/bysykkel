using System.Text.Json;
using Bysykkel.Application.Models.Bysykkel;
using Newtonsoft.Json;

namespace Bysykkel.Application.Services;

public class BysykkelService : IBysykkelService
{
    private readonly HttpClient _httpClient;
    public BysykkelService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IList<Station>> GetStationsAsync()
    {
        var response = await _httpClient.GetAsync("station_information.json");
        var data = await response.Content.ReadAsStringAsync();
        var responseObj = JsonConvert.DeserializeObject<BysykkelResponse<StationResponseData>>(data);
        if (responseObj == null)
        {
            throw new Exception("Missing response");
        }
        return responseObj.Data.Stations;
    }
}
