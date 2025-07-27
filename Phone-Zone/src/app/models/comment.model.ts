import { Phone, User } from ".";


export interface Comment{
     _id: string;
    userId: User;
    phoneId: Phone;
    text: string;
    likes: string[];
    created_at: Date;
}