using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace SlackApi
{
    public sealed class PostMessageResponse
    {
        [JsonPropertyName("ok")]
        public bool Ok { get; set; }

        [JsonPropertyName("error")]
        public string Error { get; set; }
    }
}
