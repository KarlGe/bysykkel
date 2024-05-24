using Bysykkel.Application.Models.Bysykkel;

namespace Bysykkel.Application.Services;

public interface IBysykkelService
{
    Task<IList<Station>> GetStationsAsync();
}
