import { Phone } from ".";

export interface CartModel {
    _id: string;
    userId: string;
    items: {
        phone: Phone; // Phone object
        quantity: number;
        addedAt: Date;
    }[];
}

// {
//   "_id": {
//     "$oid": "686e7ff0f0809fd5ee211bd8"
//   },
//   "userId": {
//     "$oid": "68529a720b06344412a3f2b4"
//   },
//   "items": [
//     {
//       "phone": {
//         "$oid": "686e7de6f0809fd5ee211bc4"
//       },
//       "quantity": 1,
//       "addedAt": "2023-10-15T09:30:00Z"
//     },
//     {
//       "phone": {
//         "$oid": "686e7de6f0809fd5ee211bc5"
//       },
//       "quantity": 2,
//       "addedAt": "2023-10-16T14:20:00Z"
//     }
//   ]
// }
