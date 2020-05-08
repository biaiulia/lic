using AutoMapper;
using turism.DataTransferObjects;
using turism.Models;

namespace turism.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForList>()
            .ForMember(dest => dest.Age, opt => 
            opt.MapFrom(src=>src.BirthDate.CalculateAge()))
; // specificam sursa si destinatia
         // vede in user si in userfor list ca s la fel, trebe doar la varsta sa schimbam
         CreateMap<UserForUpdate, User>();
        }

    }
}