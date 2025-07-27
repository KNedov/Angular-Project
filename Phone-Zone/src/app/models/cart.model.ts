import { Phone } from ".";


export interface Cart{
        _id: string;
    userId: string;
    items: {
        phone: Phone; // Phone object
        quantity: number;
        addedAt: Date;
    }
}