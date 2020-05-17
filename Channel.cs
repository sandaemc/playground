using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SlackApi
{
    public class Channel
    {
        private readonly string _channelId;
        private readonly HttpClient _client;

        public Channel(string channelId, HttpClient client)
        {
            _channelId = channelId;
            _client = client;
        }
        
        public async Task<PostMessageResponse> PostMessage(string message)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "/api/chat.postMessage")
            {
                Content = new StringContent(JsonSerializer.Serialize(new PostMessagePayload()
                {
                    Channel = _channelId,
                    Text = message
                }), Encoding.UTF8, "application/json")
            };

            var response = await _client.SendAsync(request);
            var body = JsonSerializer.Deserialize<PostMessageResponse>(await response.Content.ReadAsStringAsync());
            if (!body.Ok)
            {
                throw new Exception(body.Error);
            }

            return body;
        }
        
    }
}