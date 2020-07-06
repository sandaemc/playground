using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace Auth0ClientNET
{
    public sealed class Auth0Client
    {
        private readonly Auth0ClientOptions _options;
        private readonly HttpClient _client;

        public Auth0Client(Auth0ClientOptions options)
        {
            _options = options;
            
            _client = new HttpClient()
            {
                BaseAddress = new Uri($"https://{options.Domain}")
            };
        }

        public async Task<DeviceCodeResponse> RegisterDevice()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "oauth/device/code");
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            request.Content = new FormUrlEncodedContent(new []
            {
                new KeyValuePair<string, string>("client_id", _options.ClientId),
                new KeyValuePair<string, string>("scope", "offline_access"), 
                new KeyValuePair<string, string>("audience", _options.Audience), 
            });
            
            var response = await _client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            return JsonSerializer.Deserialize<DeviceCodeResponse>(await response.Content.ReadAsStringAsync());
        }

        public async Task<LoginResponse> Login(string deviceCode)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "oauth/token");
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            request.Content = new FormUrlEncodedContent(new []
            {
                new KeyValuePair<string, string>("grant_type", "urn:ietf:params:oauth:grant-type:device_code"),
                new KeyValuePair<string, string>("scope", "offline_access"), 
                new KeyValuePair<string, string>("client_id", _options.ClientId), 
                new KeyValuePair<string, string>("device_code", deviceCode), 
            });
            
            var response = await _client.SendAsync(request);
            Console.WriteLine(await response.Content.ReadAsStringAsync());
            response.EnsureSuccessStatusCode();

            return JsonSerializer.Deserialize<LoginResponse>(await response.Content.ReadAsStringAsync());
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(string refreshToken)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "oauth/token");
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
            request.Content = new FormUrlEncodedContent(new []
            {
                new KeyValuePair<string, string>("client_secret", _options.ClientSecret),
                new KeyValuePair<string, string>("grant_type", "refresh_token"), 
                new KeyValuePair<string, string>("client_id", _options.ClientId), 
                new KeyValuePair<string, string>("refresh_token", refreshToken), 
            });
            
            var response = await _client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            return JsonSerializer.Deserialize<RefreshTokenResponse>(await response.Content.ReadAsStringAsync());
        }
    }
}