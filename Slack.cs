using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SlackApi
{
    public class Slack
    {
        private readonly HttpClient _client;

        public Slack(string authToken)
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");
        }

        public async Task<PostMessageResponse> PostAsync(string channel, string message)
        {
            var payload = new PostMessagePayload()
            {
                Channel = channel,
                Text = message
            };

            var response = await _client.PostAsync(
                "https://slack.com/api/chat.postMessage",
                new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
            );

            response.EnsureSuccessStatusCode();

            var body = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<PostMessageResponse>(body);
        }
    }
}
