namespace Study_helper_tools.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public bool IsDone { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime DoneDate { get; set; }
        public int TimePerTask { get; set; }
        public int UserId { get; set; }
    }
}
