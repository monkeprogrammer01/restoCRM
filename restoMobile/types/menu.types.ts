export interface Dish {
    _id: string;
    name: string;
    price: number;
    icon: string;
    iconLib: string;
    category: string;
    rating: number;
    description: string;
    calories: number;
    prepTime: string;
    popular?: boolean;
}