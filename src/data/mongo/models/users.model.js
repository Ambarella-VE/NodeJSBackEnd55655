/* -------------------------------------------- */
/*              //* users.model.js              */
/* -------------------------------------------- */
import { model, Schema } from 'mongoose';

const collection = 'users';
const schema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    photo: { type: String, default: '/img/balloon.jpeg' },
    password: { type: String, required: true },
    birthday: { type: Date },
  },
  { timestamps: true },
);

const User = model(collection, schema);

export default User;
