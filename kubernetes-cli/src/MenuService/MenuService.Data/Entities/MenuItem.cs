namespace MenuService.Data.Entities
{
    public class MenuMenuItem
    {
        public long MenuId {get;set;}
        public long MenuItemId { get; set; }
    }

    public class MenuItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
