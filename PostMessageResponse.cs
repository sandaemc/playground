using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace SlackApi
{
    public class PostMessageResponse
    {
        [JsonPropertyName("ok")]
        public bool Ok { get; set; }

#nullable enable
        [JsonPropertyName("error")]
        public string? Error { get; set; }
#nullable disable
    }
}
