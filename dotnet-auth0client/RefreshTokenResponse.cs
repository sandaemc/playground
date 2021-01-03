using System.Text.Json.Serialization;

namespace Auth0ClientNET
{
    public sealed class RefreshTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
        
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }
}