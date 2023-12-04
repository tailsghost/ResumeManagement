﻿using AutoMapper;
using ResumeManagement.Server.Core.Dtos.Company;
using ResumeManagement.Server.Core.Dtos.Job;
using ResumeManagement.Server.Core.Entities;

namespace ResumeManagement.Server.Core.AutoMapperConfig;

public class AutoMapperConfigProfile : Profile
{
    public AutoMapperConfigProfile()
    {
        // Company 
        CreateMap<CompanyCreateDto, Company>();
        CreateMap<Company, CompanyGetDto>();

        // Job
        CreateMap<JobCreateDto, Job>();
        CreateMap<Job, JobGetDto>()
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));

    }
}
