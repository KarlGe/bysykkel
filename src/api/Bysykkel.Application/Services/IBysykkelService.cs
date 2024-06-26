using Bysykkel.Application.Models.Bysykkel;

namespace Bysykkel.Application.Services;

public interface IBysykkelService
{
    Task<IEnumerable<Station>> GetStationsAsync();
    Task<BysykkelResponse<StationStatusResponseData>> GetStationStatusAsync();
    Task<BysykkelResponse<StationInfoResponseData>> GetStationInfoAsync();
}
