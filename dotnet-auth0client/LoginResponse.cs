using System.Text.Json.Serialization;

namespace Auth0ClientNET
{
    public sealed class LoginResponse
    {
        [JsonPropertyName("identity_token")] public string IdentityToken { get; set; }
        [JsonPropertyName("access_token")] public string AccessToken { get; set; }
        [JsonPropertyName("refresh_token")] public string RefreshToken { get; set; }
        [JsonPropertyName("expires_in")] public int ExpiresIn { get; set; }
    }
}