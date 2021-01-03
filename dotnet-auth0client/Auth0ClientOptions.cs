namespace Auth0ClientNET
{
    public sealed class Auth0ClientOptions
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Domain { get; set; }
        public string Audience { get; set; }
    }
}