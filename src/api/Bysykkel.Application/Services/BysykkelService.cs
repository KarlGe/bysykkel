using Bysykkel.Application.Enums;
using Bysykkel.Application.Models.Bysykkel;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Bysykkel.Application.Services;

public class BysykkelService : IBysykkelService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _memoryCache;
    public BysykkelService(HttpClient httpClient, IMemoryCache memoryCache)
    {
        _httpClient = httpClient;
        _memoryCache = memoryCache;
    }

    public async Task<IEnumerable<Station>> GetStationsAsync()
    {
        IEnumerable<Station>? stations;
        if (!_memoryCache.TryGetValue(CacheKeys.STATIONS, out stations))
        {
            var stationInfoData = GetStationInfoAsync();
            var stationStatusData = GetStationStatusAsync();
            await Task.WhenAll(stationInfoData, stationStatusData);
            stations = MergeStationData(stationInfoData.Result, stationStatusData.Result);
            _memoryCache.Set(CacheKeys.STATIONS, stations);
        }
        if (stations == null)
        {
            throw new Exception("Missing station data");
        }
        return stations;
    }
    public async Task<IEnumerable<StationInfo>> GetStationInfoAsync()
    {
        var responseInfo = await _httpClient.GetAsync("station_information.json");
        var data = await responseInfo.Content.ReadAsStringAsync();
        var responseObj = JsonConvert.DeserializeObject<BysykkelResponse<StationInfoResponseData>>(data);
        if (responseObj == null)
        {
            throw new Exception("Missing station info response from Bysykkel");
        }
        return responseObj.Data.Stations;
    }
    public async Task<IEnumerable<StationStatus>> GetStationStatusAsync()
    {
        var response = await _httpClient.GetAsync("station_status.json");
        var data = await response.Content.ReadAsStringAsync();
        var responseObj = JsonConvert.DeserializeObject<BysykkelResponse<StationStatusResponseData>>(data);
        if (responseObj == null)
        {
            throw new Exception("Missing station status response from Bysykkel");
        }
        return responseObj.Data.Stations;
    }
    IEnumerable<Station> MergeStationData(IEnumerable<StationInfo> statitionInfoList, IEnumerable<StationStatus> statitionStatusList)
    {
        return statitionInfoList.Select((stationInfo) =>
            {
                var stationStatus = statitionStatusList.First((status) => status.StationId == stationInfo.StationId);
                return new Station(stationInfo, stationStatus);
            }
        );
    }
}
