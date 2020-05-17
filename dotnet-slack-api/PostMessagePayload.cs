using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace SlackApi
{
    public sealed class PostMessagePayload
    {
        [JsonPropertyName("channel")]
        public string Channel { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
