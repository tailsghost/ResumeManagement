using Microsoft.AspNetCore.Mvc;
using ResumeManagement.Server.Core.Enums;

namespace ResumeManagement.Server.Core.Dtos.Company;

public class CompanyPutDto
{
    public long Id { get; set; }

    public string Name { get; set; }

    public CompanySize Size { get; set; }
}

