/* -------------------------------------------- */
/*              //* orders.model.js             */
/* -------------------------------------------- */
import { model, Schema, Types } from 'mongoose';

const collection = 'orders';
const schema = new Schema({
  uid: { type: Types.ObjectId, required: true, ref: "users"},
  pid: { type: Types.ObjectId, required: true, ref: "products"},
  quantity: { type: Number, default: 1},
  state: { type: String, default: 'reserved', enum: ['reserved','payed','cancelled','delivered', 'returned'] },
},{ timestamps: true });

const Order = model(collection, schema);
export default Order;