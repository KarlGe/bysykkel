using AutoMapper;
using Bysykkel.API.DTOs;
using Bysykkel.Application.Models.Bysykkel;

namespace Bysykkel.API;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Station, StationDTO>();
    }
}