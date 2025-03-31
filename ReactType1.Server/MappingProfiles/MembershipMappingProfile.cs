using ReactType1.Server.DTOs.Membership;
using ReactType1.Server.Models;
using AutoMapper;



namespace ReactType1.Server.MappingProfiles
{
    public class MembershipMappingProfile : Profile
    {
        public MembershipMappingProfile()
        {
            // The CreateMap method create a mapping configuration between the Product entity and the ProductDTO.
            // This configuration tells AutoMapper how to convert a Product instance (source)
            // into a ProductDTO instance (destination).
            CreateMap<Membership, GetMembershipDetailsDto>()
               .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.FirstName,
                    opt => opt.MapFrom(src => src.FirstName)
                )
                .ForMember(
                    dest => dest.FirstName,
                    opt => opt.MapFrom(src => src.FirstName)
                )
                .ForMember(
                    dest => dest.LastName,
                    opt => opt.MapFrom(src => src.LastName)
                )
                .ForMember(
                    dest => dest.LastName,
                    opt => opt.MapFrom(src => src.LastName)
                )
                .ForMember(
                    dest => dest.Shortname,
                    opt => opt.MapFrom(src => src.Shortname)
                )
                .ForMember(
                    dest => dest.Shortname,
                    opt => opt.MapFrom(src => src.Shortname)
                )
                .ForMember(
                    dest => dest.Wheelchair,
                    opt => opt.MapFrom(src => src.Wheelchair)
                )
                .ForMember(
                    dest => dest.Wheelchair,
                    opt => opt.MapFrom(src => src.Wheelchair)
                );
            CreateMap<GetMembershipDetailsDto, Membership>();

            CreateMap<Membership, CreateMembershipDto>()
               .ForMember(
                   dest => dest.FirstName,
                   opt => opt.MapFrom(src => src.FirstName)
               )
               .ForMember(
                   dest => dest.FirstName,
                   opt => opt.MapFrom(src => src.FirstName)
               )
               .ForMember(
                   dest => dest.LastName,
                   opt => opt.MapFrom(src => src.LastName)
               )
               .ForMember(
                   dest => dest.LastName,
                   opt => opt.MapFrom(src => src.LastName)
               )
               .ForMember(
                   dest => dest.Shortname,
                   opt => opt.MapFrom(src => src.Shortname)
               )
               .ForMember(
                   dest => dest.Shortname,
                   opt => opt.MapFrom(src => src.Shortname)
               )
               .ForMember(
                   dest => dest.Wheelchair,
                   opt => opt.MapFrom(src => src.Wheelchair)
               )
               .ForMember(
                   dest => dest.Wheelchair,
                   opt => opt.MapFrom(src => src.Wheelchair)
               );
            CreateMap<CreateMembershipDto, Membership>();

            CreateMap<Membership, UpdateMembershipDto>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
               .ForMember(
                   dest => dest.FirstName,
                   opt => opt.MapFrom(src => src.FirstName)
               )
               .ForMember(
                   dest => dest.FirstName,
                   opt => opt.MapFrom(src => src.FirstName)
               )
               .ForMember(
                   dest => dest.LastName,
                   opt => opt.MapFrom(src => src.LastName)
               )
               .ForMember(
                   dest => dest.LastName,
                   opt => opt.MapFrom(src => src.LastName)
               )
               .ForMember(
                   dest => dest.Shortname,
                   opt => opt.MapFrom(src => src.Shortname)
               )
               .ForMember(
                   dest => dest.Shortname,
                   opt => opt.MapFrom(src => src.Shortname)
               )
               .ForMember(
                   dest => dest.Wheelchair,
                   opt => opt.MapFrom(src => src.Wheelchair)
               )
               .ForMember(
                   dest => dest.Wheelchair,
                   opt => opt.MapFrom(src => src.Wheelchair)
               );
            CreateMap<UpdateMembershipDto, Membership>();

            CreateMap<Membership, DeleteMembershipDto>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                )
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id)
                );
            CreateMap<DeleteMembershipDto, Membership>();
        }
    }

}

