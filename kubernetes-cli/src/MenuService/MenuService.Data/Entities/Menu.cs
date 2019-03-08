
using System;
using System.Collections.Generic;

namespace MenuService.Data.Entities
{
    public enum MealTime
    {
        Breakfast, 
        Lunch, 
        Dinner, 
        Brunch
    }

    public class Menu
    {
        public long Id { get; set; }
        public string MenuName { get; set; }
        public MealTime Meal { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<MenuItem> Items { get; set; }
    }
}
