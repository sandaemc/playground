using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SlackApi
{
    public class Slack
    {
        private readonly HttpClient _client;

        public Slack(string authToken, HttpClient client)
        {
            _client = client;
            _client.DefaultRequestHeaders.Clear();
            _client.BaseAddress = new Uri("https://slack.com");
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");
            _client.Timeout = TimeSpan.FromSeconds(30);
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public Channel GetChannel(string channelId)
        {
            return new Channel(channelId, _client);
        }
    }
}
