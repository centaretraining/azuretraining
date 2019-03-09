
export enum MealTime {
    Breakfast, 
    Lunch, 
    Dinner, 
    Brunch
}

export interface MenuItem {
    Id: number;
    Name: string;
    Price: number;
}

export interface Menu {
    Id: number;
    MenuName: string;
    Meal: MealTime;
    Start: Date;
    End: Date;
    Items: MenuItem[];
}
