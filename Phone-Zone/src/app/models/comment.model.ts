import { Phone, User } from ".";


export interface Comment{
     _id: string;
    userId: User;
    phoneId: Phone;
    text: string;
    likes: [];
    created_at: Date;
}