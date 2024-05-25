namespace Bysykkel.Application.Models.Bysykkel;

public class Station
{
    public Station(StationInfo info, StationStatus status)
    {
        Info = info;
        Status = status;
    }
    public StationInfo Info { get; set; }
    public StationStatus Status { get; set; }
}
