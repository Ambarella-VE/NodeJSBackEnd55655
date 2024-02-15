/* -------------------------------------------- */
/*              //* orders.model.js             */
/* -------------------------------------------- */
import { model, Schema, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'orders';
const schema = new Schema({
  uid: { type: Types.ObjectId, required: true, ref: "users"},
  pid: { type: Types.ObjectId, required: true, ref: "products"},
  quantity: { type: Number, default: 1},
  state: { type: String, default: 'reserved', enum: ['reserved','payed','cancelled','delivered', 'returned'] },
},{ timestamps: true });

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);
export default Order;