import { Phone } from '.';

export interface Cart {
  _id: string;
  userId: string;
  items: {
    phone: Phone;
    quantity: number;
    addedAt: Date;
  };
}
