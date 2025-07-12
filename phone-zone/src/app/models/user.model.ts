import { Comment,Phone } from ".";

export interface User {
  tel: string;
  email: string;
  username: string;
  password: string;
    cart: string[]; // Array of phone IDs
    phones: Phone[]; // Array of phone IDs
    comments: Comment[]; // Array of comment IDs
}

    // tel: {
    //     type: String,
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     minlength: [5, 'Username should be at least 5 characters'],
    //     validate: {
    //         validator: function (v) {
    //             return /[a-zA-Z0-9]+/g.test(v);
    //         },
    //         message: props => `${props.value} must contains only latin letters and digits!`
    //     },
    // },cart: [
    //         {
    //             type: ObjectId,
    //             ref: "User",
    //         },
    //     ],
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: [5, 'Password should be at least 5 characters'],
    //     validate: {
    //         validator: function (v) {
    //             return /[a-zA-Z0-9]+/g.test(v);
    //         },
    //         message: props => `${props.value} must contains only latin letters and digits!`
    //     },
    // },
    // phones: [{
    //     type: ObjectId,
    //     ref: "Phone"
    // }],
    // comments: [{
    //     type: ObjectId,
    //     ref: "Comment"
    // }]