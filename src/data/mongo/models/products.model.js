/* -------------------------------------------- */
/*             //* products.model.js            */
/* -------------------------------------------- */
import { model, Schema } from 'mongoose';

const collection = "products";
const schema = new Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, default: '/img/balloon.jpeg'},
    code: {type: String, require: true, unique: true},
    stock: {type: Number, require: true},
},{timestamps: true});

const Product = model(collection, schema);

export default Product;