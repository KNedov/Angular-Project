import { Phone } from ".";
import { User } from ".";

export interface Comment {
    _id: string;
    userId: User;
    phoneId: Phone;
    text: string;
    likes: string[];
    created_at: Date;
}

// {
//   "_id": {
//     "$oid": "686e7f63f0809fd5ee211bd2"
//   },
//   "text": "Отличен телефон! Много съм доволен от покупката.",
//   "likes": [
//     {
//       "$oid": "686e7eecf0809fd5ee211bcc"
//     },
//     {
//       "$oid": "686e7eecf0809fd5ee211bcd"
//     }
//   ],
//   "userId": {
//     "$oid": "686e7eecf0809fd5ee211bcb"
//   },
//   "phoneId": {
//     "$oid": "686e7de6f0809fd5ee211bc4"
//   },
//   "created_at": "2023-09-25T10:15:00Z"
// }