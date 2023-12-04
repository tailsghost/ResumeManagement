using System.ComponentModel.DataAnnotations;

namespace ResumeManagement.Server.Core.Entities;

public abstract class BaseEntity
{
    [Key]
    public long Id { get; set; }

    public DateTime CreateAt { get; set; } = DateTime.Now;

    public DateTime? UpdateAt { get; set; } = DateTime.Now;

    public bool IsActive { get; set; } = true;


}

