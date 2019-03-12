using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ServerlessFoodOrder.Services
{
    public interface IServiceBus
    {
        Task PublishAsync(object messageData);
    }
}
