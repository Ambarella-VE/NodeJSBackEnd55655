/* -------------------------------------------- */
/*             //* products.model.js            */
/* -------------------------------------------- */
import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products';
const schema = new Schema(
  {
    title: { type: String, require: true, index: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, default: '/img/balloon.jpeg' },
    code: { type: String, require: true, unique: true, index:true },
    stock: { type: Number, require: true },
  },
  { timestamps: true },
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);

export default Product;
