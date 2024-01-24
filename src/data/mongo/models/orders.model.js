/* -------------------------------------------- */
/*              //* orders.model.js             */
/* -------------------------------------------- */
import { model, Schema } from 'mongoose';

const collection = "orders";
const schema = new Schema({
    products: { type: Array, required: true },
});