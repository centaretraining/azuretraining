using System.Threading.Tasks;

namespace WebAppFoodOrder.Services.Events
{
    public interface IServiceBus
    {
        Task PublishAsync(object messageData);
    }
}
