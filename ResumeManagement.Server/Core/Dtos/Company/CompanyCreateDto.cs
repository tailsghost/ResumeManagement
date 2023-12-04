using ResumeManagement.Server.Core.Enums;

namespace ResumeManagement.Server.Core.Dtos.Company;

public class CompanyCreateDto
{
    public string Name { get; set; }

    public CompanySize Size { get; set; }
}

