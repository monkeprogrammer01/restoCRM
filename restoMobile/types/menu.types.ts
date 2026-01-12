export interface Dish {
    _id: string;
    name: string;
    price: number;
    image: string;
    icon?: string;
    iconLib?: string;
    category: string;
    rating: number;
    description: string;
    calories: number;
    prepTime: string;
    popular?: boolean;
}