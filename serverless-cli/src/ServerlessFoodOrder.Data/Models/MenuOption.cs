﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServerlessFoodOrder.Data.Models
{
    public class MenuOption
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "price")]
        public double Price { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
    }
}