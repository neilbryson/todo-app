namespace TodoServer.Models
{
    public class ChangeDone : IChangeDone
    {
        public string Id { get; set; }
        public bool IsDone { get; set; }
    }

    public interface IChangeDone
    {
        string Id { get; set; }
        bool IsDone { get; set; }
    }
}
