using ResumeManagement.Server.Core.Entities;
using ResumeManagement.Server.Core.Enums;

namespace ResumeManagement.Server.Core.Dtos.Job;

public class JobGetDto
{
    public long Id { get; set; }

    public string Title { get; set; }

    public JobLevel Level { get; set; }

    public long CompanyId { get; set; }

    public string CompanyName { get; set; }

    public DateTime CreateAt { get; set; } = DateTime.Now;
}

