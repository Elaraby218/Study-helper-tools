namespace Study_helper_tools.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Password { get; set; }
        public string PhotoPath { get; set; }
    }
}
