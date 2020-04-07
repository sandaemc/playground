using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace SlackApi
{
    public class PostMessagePayload
    {
        [JsonPropertyName("channel")]
        public string Channel { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("as_user")]
        public bool AsUser { get; set; } = false;
    }
}
