import{Comment, User} from "."


export interface Phone {
    _id: string;
    phoneName: string;
    displaySize: string;
    color: string;
    price: number;
    image: string;
    userId: User; // User ID of the phone owner
    comments: Comment[]; // Array of comments associated with the phone
    created_at: Date; // Creation date of the phone entry
  
}

// {
//   "_id": {
//     "$oid": "686e7de6f0809fd5ee211bc4"
//   },
//   "phoneName": "iPhone 15 Pro Max",
//   "displaySize": "6.7",
//   "color": "Space Black",
//   "price": 1299,
//   "image": "https://s13emagst.akamaized.net/products/60458/60457156/images/res_968c9ac33392707226842f4933552b0c.jpg?width=720&height=720&hash=E6495DD6BD702C3B660156F76D2B0FDB",
//   "userId": {
//     "$oid": "686e7eecf0809fd5ee211bcb"
//   },
//   "comments": [
//     {
//       "$oid": "686e7f63f0809fd5ee211bd2"
//     }
//   ],
//   "created_at": "2023-09-22T10:00:00Z"
// }