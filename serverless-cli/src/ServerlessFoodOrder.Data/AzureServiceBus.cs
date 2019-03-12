using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ServerlessFoodOrder.Services;

namespace ServerlessFoodOrder.Data
{
    public class AzureServiceBus : IServiceBus
    {
        private static ITopicClient _client;

        private readonly string _connectionString;
        private readonly string _topicName;

        public AzureServiceBus(IConfiguration configuration)
        {
            _connectionString = configuration["ServiceBusConnectionString"];
            _topicName = configuration["ServiceBusTopicName"];
        }

        public async Task PublishAsync(object messageData)
        {
            if (!string.IsNullOrEmpty(_connectionString))
            {
                if (_client == null)
                {
                    _client = new TopicClient(_connectionString, _topicName);
                }

                var messageBody = JsonConvert.SerializeObject(messageData);
                var message = new Message(Encoding.UTF8.GetBytes(messageBody));

                await _client.SendAsync(message);
            }
        }
    }
}
