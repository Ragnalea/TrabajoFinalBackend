import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { ROLE_ADMIN } from './users.model.js';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  plataform: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: String,
    default: ROLE_ADMIN,
  },
}).plugin(paginate);

export const productModel = mongoose.model('Products', productsSchema);
