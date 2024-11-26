export type GetMealResponse = {
    mealDBid : string;
    name : string;
    image: string;
    ingredients: string[];
}

export type AddMealRequest = {
    mealDBid: string;
    startDate: Date;
}

export type AddMealResponse = {
    message: string;
}