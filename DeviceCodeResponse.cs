using System.Text.Json.Serialization;

namespace Auth0ClientNET
{
    public sealed class DeviceCodeResponse
    {
        [JsonPropertyName("device_code")]
        public string DeviceCode { get; set; }
        
        [JsonPropertyName("user_code")]
        public string UserCode { get; set; }
        
        [JsonPropertyName("verification_uri_complete")]
        public string VerificationUriComplete { get; set; }
        
    }
}