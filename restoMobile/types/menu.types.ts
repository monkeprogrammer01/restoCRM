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

export interface Category {
    _id: string,
    slug: string,
    name: string,
    icon?: string,
    iconLib?: string,
    order: number
}